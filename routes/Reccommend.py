import sys
import json
from sentence_transformers import SentenceTransformer

model = SentenceTransformer("all-MiniLM-L6-v2")

def find_similar_wines(id):
    # Simulación de recomendación basada en ML
    print("Id: ", id)
    similar_wines = [
        {"name": "Vino A", "similarity": 0.92},
        {"name": "Vino B", "similarity": 0.87},
        {"name": "Vino C", "similarity": 0.83},
    ]
    return similar_wines

if __name__ == "__main__":
    id = sys.argv[1]
    result = find_similar_wines(id)
    print(json.dumps(result))  # Devolver en formato JSON