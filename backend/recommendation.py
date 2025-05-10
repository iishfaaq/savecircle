def recommend_saving_action(user_id, user_history, all_users_history):
    # Example: collaborative filtering (very basic)
    # Find similar users (e.g., by clustering or nearest neighbors)
    # For demo, just suggest a day with highest average saving among similar users
    # In production, use Surprise, LightFM, or your own model
    # Return a string suggestion
    return "Try adding 250 LKR on Friday. People similar to you met their goal by focusing savings at the end of the week."
