from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

companies_df = pd.read_csv("companies.csv")
locations_df = pd.read_csv("locations.csv")

@app.get("/")
async def read_root():
    return {"message": "Welcome to the Company API"}

@app.get("/companies")
async def get_companies():
    return companies_df.to_dict(orient="records")

@app.get("/companies/{company_id}")
async def get_company(company_id: int):
    company = companies_df[companies_df["company_id"] == company_id]
    if company.empty:
        raise HTTPException(status_code=404, detail="Company not found")
    return company.to_dict(orient="records")[0]

@app.get("/companies/{company_id}/locations")
async def get_company_locations(company_id: int):
    locations = locations_df[locations_df["company_id"] == company_id]
    if locations.empty:
        raise HTTPException(status_code=404, detail="Locations not found")
    return locations.to_dict(orient="records")
