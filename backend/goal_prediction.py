import joblib

model = joblib.load("goal_predictor.pkl")

def will_miss_goal(features):
    X = [[features[k] for k in sorted(features)]]
    prob = model.predict_proba(X)[0,1]
    return prob > 0.5
