import openai
import os
import json
from flask import Flask, request, jsonify
from dotenv import load_dotenv

load_dotenv()
app = Flask(__name__)
openai.api_key = os.getenv("OPENAI_KEY")

def loadPostdata():
    with open("posts.json", "r") as file:
        postdata = json.load(file)
    postinfo = "\n".join(
        f"Post ID: {posts['post_id']}"
        f"Poster: {post['postPoster']}"
        f"Content: {post['postContent']}"
        for post in postdata
    )
    return postinfo
  
SYS_PROMPT = f"Respond according to the following data:\n\n{loadPostdata()}"

@app.route('/message', methods=['POST'])
def message():
    data = request.json
    user_message = data.get("message", "")
    if not user_message:
        return jsonify({"error": "No message provided"}), 400
    try:
        response = openai.ChatCompletion.create(
            model="gpt-4o-mini",
            messages=[
                {"role": "system", "content": SYS_PROMPT},
                {"role": "user", "content": user_message}
            ]
        )
        reply = response['choices'][0]['message']['content']
        return jsonify({"AI": reply})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
