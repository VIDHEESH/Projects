import dash
from dash import dcc, html
from dash.dependencies import Input, Output, State
import plotly.graph_objects as go
import pandas as pd
import numpy as np
from sklearn.linear_model import LinearRegression
from prophet import Prophet
from sklearn.metrics import mean_squared_error, mean_absolute_percentage_error
import plotly.express as px

# Temperature data functions
# Add error handling for file loading
def load_temperature_data(file_path='Temperature/ZonAnn.Ts+dSST.csv'):
    try:
        df = pd.read_csv(file_path)
        prophet_df = df[['Year', 'Glob']].rename(columns={'Year': 'ds', 'Glob': 'y'})
        prophet_df['ds'] = pd.to_datetime(prophet_df['ds'], format='%Y')
        return df, prophet_df
    except FileNotFoundError:
        print(f"Error: File {file_path} not found")
        return None, None

def create_temperature_forecast(prophet_df, forecast_year):
    model = Prophet()
    model.fit(prophet_df)
    
    last_year = prophet_df['ds'].dt.year.max()
    required_years = forecast_year - last_year
    
    future = model.make_future_dataframe(periods=required_years + 5, freq='Y')
    forecast = model.predict(future)
    return forecast

# CO2 Functions (from previous code)
def clean_emissions_data(file_path):
    df = pd.read_csv(file_path, encoding='utf-8-sig', index_col=0).T
    years = [col for col in df.columns if str(col).isdigit()]
    df = df[years]
    df = df.apply(pd.to_numeric, errors='coerce')
    df = df.dropna(how='all', axis=0)
    df = df.dropna(how='all', axis=1)
    return df

def calculate_global_emissions(df):
    global_emissions = df.sum()
    global_emissions.index = pd.to_datetime(global_emissions.index, format='%Y')
    return global_emissions

def split_time_series(data, test_size=0.2):
    train_size = int(len(data) * (1 - test_size))
    train = data[:train_size]
    test = data[train_size:]
    return train, test

def linear_regression_forecast(train_data, test_data, forecast_years=10):
    X_train = np.array(range(len(train_data))).reshape(-1, 1)
    y_train = train_data.values
    X_test = np.array(range(len(train_data), len(train_data) + len(test_data))).reshape(-1, 1)
    
    linear_model = LinearRegression()
    linear_model.fit(X_train, y_train)
    
    test_predictions = linear_model.predict(X_test)
    future_X = np.array(range(len(train_data) + len(test_data), 
                             len(train_data) + len(test_data) + forecast_years)).reshape(-1, 1)
    future_predictions = linear_model.predict(future_X)
    
    return test_predictions, future_predictions

def prophet_forecast(train_data, test_data, forecast_years=10):
    # Create DataFrame for Prophet
    train_df = pd.DataFrame({
        'ds': pd.to_datetime(train_data.index),  # Ensure datetime format
        'y': train_data.values
    })
    
    # Initialize and fit Prophet model
    prophet_model = Prophet(
        changepoint_prior_scale=0.05,
        seasonality_prior_scale=0.1,
        yearly_seasonality=False
    )
    prophet_model.fit(train_df)
    
    # Create future dates
    future_dates = pd.date_range(
        start=train_data.index.max(),
        periods=len(test_data) + forecast_years + 1,
        freq='Y'
    )
    
    future = pd.DataFrame({'ds': future_dates})
    
    # Make predictions
    forecast = prophet_model.predict(future)
    
    # Ensure forecast is a proper DataFrame with required columns
    return pd.DataFrame({
        'ds': forecast['ds'],
        'yhat': forecast['yhat'],
        'yhat_lower': forecast['yhat_lower'],
        'yhat_upper': forecast['yhat_upper']
    })

# Load initial data
temp_df, temp_prophet_df = load_temperature_data()
co2_df = clean_emissions_data('CO2/export_emissions.csv')
global_emissions = calculate_global_emissions(co2_df)
train_data, test_data = split_time_series(global_emissions)

# Initialize the Dash app
app = dash.Dash(__name__)
server=app.server

# Define the layout
app.layout = html.Div([
    html.H1('Climate Change Dashboard',
            style={'textAlign': 'center', 'color': '#2C3E50', 'marginBottom': 30}),
    
    html.Div([
        html.Div([
            html.Label('Select Forecast Year:'),
            dcc.Input(
                id='forecast-year',
                type='number',
                value=2050,
                min=2025,
                max=2100,
                step=1
            ),
            html.Button('Update Forecast', id='forecast-button', n_clicks=0)
        ], style={'marginBottom': 20}),
        
        html.Div([
            dcc.Tabs([
                dcc.Tab(label='Temperature Analysis', children=[
                    dcc.Graph(id='temp-historical-plot'),
                    dcc.Graph(id='temp-forecast-plot'),
                    html.Div(id='temp-metrics')
                ]),
                dcc.Tab(label='CO2 Emissions', children=[
                    dcc.Graph(id='co2-historical-plot'),
                    dcc.Graph(id='co2-forecast-plot'),
                    html.Div(id='co2-metrics')
                ]),
                dcc.Tab(label='Combined Analysis', children=[
                    dcc.Graph(id='combined-plot'),
                    html.Div(id='correlation-metrics')
                ])
            ])
        ])
    ])
])

@app.callback(
    [Output('temp-historical-plot', 'figure'),
     Output('temp-forecast-plot', 'figure'),
     Output('co2-historical-plot', 'figure'),
     Output('co2-forecast-plot', 'figure'),
     Output('combined-plot', 'figure'),
     Output('temp-metrics', 'children'),
     Output('co2-metrics', 'children'),
     Output('correlation-metrics', 'children')],
    [Input('forecast-button', 'n_clicks')],
    [State('forecast-year', 'value')]
)
def update_dashboard(n_clicks, forecast_year):
    # Temperature Forecasting
    temp_forecast = create_temperature_forecast(temp_prophet_df, forecast_year)
    
    # Temperature Historical Plot
    fig_temp_hist = go.Figure()
    fig_temp_hist.add_trace(go.Scatter(
        x=temp_df['Year'],
        y=temp_df['Glob'],
        name='Historical Temperature',
        line=dict(color='red')
    ))
    fig_temp_hist.update_layout(
        title='Historical Temperature Anomalies',
        xaxis_title='Year',
        yaxis_title='Temperature Anomaly (°C)'
    )
    
    # Temperature Forecast Plot
    fig_temp_forecast = go.Figure()
    fig_temp_forecast.add_trace(go.Scatter(
        x=temp_forecast['ds'],
        y=temp_forecast['yhat'],
        name='Temperature Forecast',
        line=dict(color='red')
    ))
    fig_temp_forecast.add_trace(go.Scatter(
        x=temp_forecast['ds'].tolist() + temp_forecast['ds'].tolist()[::-1],
        y=temp_forecast['yhat_upper'].tolist() + temp_forecast['yhat_lower'].tolist()[::-1],
        fill='toself',
        fillcolor='rgba(255,0,0,0.2)',
        line=dict(color='rgba(255,0,0,0)'),
        name='95% Prediction Interval'
    ))
    fig_temp_forecast.update_layout(
        title='Temperature Forecast',
        xaxis_title='Year',
        yaxis_title='Temperature Anomaly (°C)'
    )
    
    # CO2 Forecasting
    last_year = test_data.index[-1].year
    forecast_years = max(forecast_year - last_year, 0)
    test_pred_linear, future_pred_linear = linear_regression_forecast(
        train_data, test_data, forecast_years)
    co2_forecast = prophet_forecast(train_data, test_data, forecast_years)
    
    # CO2 Historical Plot
    fig_co2_hist = go.Figure()
    fig_co2_hist.add_trace(go.Scatter(
        x=train_data.index,
        y=train_data.values,
        name='Training Data',
        line=dict(color='blue')
    ))
    fig_co2_hist.add_trace(go.Scatter(
        x=test_data.index,
        y=test_data.values,
        name='Test Data',
        line=dict(color='green')
    ))
    fig_co2_hist.update_layout(
        title='Historical CO2 Emissions',
        xaxis_title='Year',
        yaxis_title='CO2 Emissions (MtCO2)'
    )
    
    # CO2 Forecast Plot
# In the update_dashboard function, modify the CO2 Forecast Plot section:
    # CO2 Forecast Plot
    fig_co2_forecast = go.Figure()
    fig_co2_forecast.add_trace(go.Scatter(
        x=co2_forecast['ds'],
        y=co2_forecast['yhat'],
        name='CO2 Forecast',
        line=dict(color='blue')
    ))
    fig_co2_forecast.add_trace(go.Scatter(
        x=co2_forecast['ds'].tolist() + co2_forecast['ds'].tolist()[::-1],
        y=co2_forecast['yhat_upper'].tolist() + co2_forecast['yhat_lower'].tolist()[::-1],
        fill='toself',
        fillcolor='rgba(0,0,255,0.2)',
        line=dict(color='rgba(0,0,255,0)'),
        name='95% Prediction Interval'
    ))
    fig_co2_forecast.update_layout(
        title='CO2 Emissions Forecast',
        xaxis_title='Year',
        yaxis_title='CO2 Emissions (MtCO2)'
    )
    
    # Combined Analysis Plot
    fig_combined = go.Figure()
    fig_combined.add_trace(go.Scatter(
        x=temp_forecast['ds'],
        y=temp_forecast['yhat'],
        name='Temperature Forecast',
        line=dict(color='red'),
        yaxis='y'
    ))
    fig_combined.add_trace(go.Scatter(
        x=co2_forecast['ds'],
        y=co2_forecast['yhat'],
        name='CO2 Forecast',
        line=dict(color='blue'),
        yaxis='y2'
    ))
    fig_combined.update_layout(
        title='Combined Temperature and CO2 Analysis',
        xaxis_title='Year',
        yaxis_title='Temperature Anomaly (°C)',
        yaxis2=dict(
            title='CO2 Emissions (MtCO2)',
            overlaying='y',
            side='right'
        )
    )
    
    # Calculate metrics
    temp_metrics = html.Div([
        html.H4('Temperature Metrics'),
        html.P(f'Current Temperature Anomaly: {temp_df["Glob"].iloc[-1]:.2f}°C'),
        html.P(f'Predicted Temperature Anomaly ({forecast_year}): '
              f'{temp_forecast[temp_forecast["ds"].dt.year == forecast_year]["yhat"].values[0]:.2f}°C')
    ])
    
    co2_metrics = html.Div([
        html.H4('CO2 Metrics'),
        html.P(f'Current CO2 Emissions: {global_emissions.iloc[-1]:.2f} MtCO2'),
        html.P(f'Predicted CO2 Emissions ({forecast_year}): '
              f'{co2_forecast[co2_forecast["ds"].dt.year == forecast_year]["yhat"].values[0]:.2f} MtCO2')
    ])
    
    # Align the datasets by filtering years that exist in both temp_df and global_emissions
    common_years = temp_df['Year'][temp_df['Year'].isin(global_emissions.index.year)]
    filtered_temp = temp_df.loc[temp_df['Year'].isin(common_years), 'Glob']
    filtered_emissions = global_emissions.loc[global_emissions.index.year.isin(common_years)]

    # Ensure both arrays have the same length before calculating correlation
    if len(filtered_temp) == len(filtered_emissions):
        correlation = np.corrcoef(filtered_temp, filtered_emissions)[0, 1]
    else:
        correlation = np.nan  # Assign NaN if lengths do not match

    correlation_metrics = html.Div([
        html.H4('Correlation Analysis'),
        html.P(f'Temperature-CO2 Correlation: {correlation:.2f}' if not np.isnan(correlation) else "Correlation could not be calculated due to mismatched data  lengths.")
    ])

    
    return (fig_temp_hist, fig_temp_forecast, fig_co2_hist, fig_co2_forecast, 
            fig_combined, temp_metrics, co2_metrics, correlation_metrics)

if __name__ == '__main__':
    app.run_server(debug=True)
