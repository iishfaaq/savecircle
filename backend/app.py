from flask import Flask, request, jsonify
from ai_models import get_goal_suggestion, get_weekly_insight, generate_insight
from tts import synthesize_speech
from loan import request_loan
from recommendation import recommend_saving_action

app = Flask(__name__)

@app.route('/ai-suggestion', methods=['POST'])
def ai_suggestion():
    data = request.json
    suggestion = get_goal_suggestion(data['goal'])
    return jsonify({"suggestion": suggestion})

@app.route('/weekly-insight', methods=['POST'])
def weekly_insight():
    data = request.json
    insight = get_weekly_insight(data)
    return jsonify({"insight": insight})

@app.route('/tts', methods=['POST'])
def tts():
    data = request.json
    audio_path = synthesize_speech(data['text'], data.get('lang', 'en-US'))
    return jsonify({"audio_path": audio_path})

@app.route('/request-loan', methods=['POST'])
def loan():
    data = request.json
    result = request_loan(data['userId'], data['goalId'], data['amount'])
    return jsonify(result)

@app.route('/generate-insight', methods=['POST'])
def insight():
    data = request.json
    insight = generate_insight(data)
    return jsonify({"insight": insight})

@app.route('/recommend-action', methods=['POST'])
def recommend():
    data = request.json
    suggestion = recommend_saving_action(data['user_id'], data['user_history'], data['all_users_history'])
    return jsonify({"suggestion": suggestion})

if __name__ == '__main__':
    app.run(port=5000)
