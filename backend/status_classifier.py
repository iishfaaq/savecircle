import joblib

# Load your trained model (e.g., logistic regression, XGBoost)
model = joblib.load("status_classifier.pkl")

def predict_status(features):
    # features: dict with keys like total_balance, spending_trend, etc.
    X = [[features[k] for k in sorted(features)]]
    prob = model.predict_proba(X)[0,1]
    if prob > 0.8:
        return "on_track"
    elif prob > 0.5:
        return "warning"
    else:
        return "at_risk"
