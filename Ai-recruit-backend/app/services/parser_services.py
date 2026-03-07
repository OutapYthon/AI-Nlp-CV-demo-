import fitz
import spacy
import os

# The official SkillNER imports (using the capital 'N' per their documentation)
from spacy.matcher import PhraseMatcher
from skillNer.general_params import SKILL_DB
from skillNer.skill_extractor_class import SkillExtractor

print("1. Imports successful...")

try:
    nlp = spacy.load("en_core_web_md")
    print("2. Spacy brain loaded...")
    
    # We must pass the PhraseMatcher to the extractor so it knows how to search
    skill_extractor = SkillExtractor(nlp, SKILL_DB, PhraseMatcher)
    print("3. Skillner initialized...")
except Exception as e:
    print(f"❌ ERROR DURING LOADING: {e}")

def extract_text(pdf_path):
    if not os.path.exists(pdf_path):
        return f"Error: File {pdf_path} not found."
    try:
        doc = fitz.open(pdf_path)
        return " ".join([page.get_text() for page in doc])
    except Exception as e:
        return f"Error reading PDF: {str(e)}"

def extract_skills(text):
    print("4. Starting skill extraction...")
    
    # Extract the skills
    annotations = skill_extractor.annotate(text.lower())
    skills = []
    
    # Loop through the database matches and pull out the actual skill names
    for type_matching, arr_skills in annotations["results"].items():
        for skill in arr_skills:
            skills.append(skill['doc_node_value'])
            
    return list(set(skills))