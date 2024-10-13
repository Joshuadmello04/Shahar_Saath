from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import google.generativeai as genai
import io
from PIL import Image
from fastapi import File, UploadFile, Form

app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins; you can specify your mobile app's IP if needed
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

genai.configure(api_key="AIzaSyBPtYpPrDnDW1cjJGKi0N9PeWyoeu68UEg")
model = genai.GenerativeModel("gemini-1.5-flash")

@app.post("/generate")
async def generate_caption(input: str = Form(None), file: UploadFile = File(...)):
    image = Image.open(io.BytesIO(await file.read()))
    # Call Gemini API with the input prompt and image
    if input:
        response = model.generate_content([input, image])
    else:
        response = model.generate_content(image)

    return {"caption": response.text}
