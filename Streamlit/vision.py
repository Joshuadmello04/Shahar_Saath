from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi import File, UploadFile, Form
import io
from PIL import Image
import torch
from transformers import BlipProcessor, BlipForConditionalGeneration
from torchvision import models, transforms

app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins; you can specify your mobile app's IP if needed
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize BLIP models
blip_processor = BlipProcessor.from_pretrained("Salesforce/blip-image-captioning-base")
blip_model = BlipForConditionalGeneration.from_pretrained("Salesforce/blip-image-captioning-base")

# Define your custom ResNet50 model for grievance classification
resnet50_model = models.resnet50(weights=models.ResNet50_Weights.IMAGENET1K_V1)  # Updated with 'weights' instead of 'pretrained'
num_classes = 8  # Number of classes (grievance types)
resnet50_model.fc = torch.nn.Linear(resnet50_model.fc.in_features, num_classes)  # Adjust the final layer

# Load the custom trained weights for ResNet50
try:
    # Load the model weights (ensure the correct path and device mapping)
    resnet50_model.load_state_dict(torch.load("slum_issue_classifier_resnet50.pth", map_location=torch.device("cpu")))
    resnet50_model.eval()  # Set the model to evaluation mode
    print("Model Final Layer loaded successfully.")
except FileNotFoundError:
    raise Exception("Model file not found. Ensure the model is in the correct path.")

# Define image transform for ResNet50
transform = transforms.Compose([
    transforms.Resize(256),
    transforms.CenterCrop(224),
    transforms.ToTensor(),
    transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225]),
])

# Class names for grievance classification
class_names = [
    "Water issues", "Sanitation issues", "Electricity issues",
    "Garbage issues", "Infrastructure issues", "Poor housing",
    "Communal issues", "Disaster impacts"
]

# Function to classify grievance type based on ResNet50 model
def classify_grievance(image: Image):
    # Apply the necessary transforms to the image
    image_tensor = transform(image).unsqueeze(0)
    # Make the prediction using the ResNet50 model
    with torch.no_grad():
        outputs = resnet50_model(image_tensor)
    _, predicted_class = torch.max(outputs, 1)
    return class_names[predicted_class.item()]  # Return the grievance type (class name) and stored

# Function to generate caption using BLIP model
def generate_caption(image: Image):
    # Prepare image input for BLIP model
    inputs = blip_processor(images=image, return_tensors="pt")
    out = blip_model.generate(**inputs)
    caption = blip_processor.decode(out[0], skip_special_tokens=True)
    return caption #store caption

# FastAPI endpoint to generate grievance classification and caption
@app.post("/generate")
async def generate_caption_and_classify(file: UploadFile = File(...)):
    # Log file metadata
    print(f"Received file: {file.filename}")
    try:
        # Open and process the image file
        image = Image.open(io.BytesIO(await file.read()))
        image = image.convert("RGB")
    except Exception as e:
        return {"error": f"Failed to process the image: {str(e)}"}

    # Classify the grievance type using ResNet50
    grievance_type = classify_grievance(image)
    caption = generate_caption(image)

    return {"grievance_type": grievance_type, "caption": caption} #api content..custom made

