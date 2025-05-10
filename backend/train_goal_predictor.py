import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier  # or LogisticRegression, XGBClassifier, etc.
import joblib

# 1. Load your data
df = pd.read_csv('goal_data.csv')

# 2. Features and label
X = df.drop('will_miss_goal', axis=1)
y = df['will_miss_goal']

# 3. Train/test split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# 4. Train model
model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

# 5. Evaluate (optional)
print("Test accuracy:", model.score(X_test, y_test))

# 6. Save model
joblib.dump(model, 'goal_predictor.pkl')
print("Model saved as goal_predictor.pkl")
