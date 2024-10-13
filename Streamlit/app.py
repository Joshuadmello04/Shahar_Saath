import streamlit as st
import os
import google.generativeai as genai

genai.configure(api_key="AIzaSyBPtYpPrDnDW1cjJGKi0N9PeWyoeu68UEg")

model=genai.GenerativeModel("gemini-pro")
def get_gemini_response(question):
  response=model.generate_content(question)
  return response.text

st.set_page_config(page_title="Q&A Demo")

st.header("Gemini LLM Application")

input=st.text_input("Input: ",key="input")
submit=st.button("Ask the question")

if submit:
  response=get_gemini_response(input)
  st.subheader("The Response is")
  st.write(response)