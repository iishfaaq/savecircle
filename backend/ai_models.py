from transformers import AutoModelForCausalLM, AutoTokenizer, pipeline

model_name = "deepseek-ai/deepseek-llm-7b-chat"
tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModelForCausalLM.from_pretrained(model_name)
pipe = pipeline("text-generation", model=model, tokenizer=tokenizer)

def get_goal_suggestion(goal):
    prompt = f"Suggest a savings plan for my goal: {goal}"
    result = pipe(prompt, max_new_tokens=60)
    return result[0]['generated_text']

def get_weekly_insight(data):
    prompt = f"Analyze this user's weekly savings and spending and provide a helpful insight: {data}"
    result = pipe(prompt, max_new_tokens=80)
    return result[0]['generated_text']
