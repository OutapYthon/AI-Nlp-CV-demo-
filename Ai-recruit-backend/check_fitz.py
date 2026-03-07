try:
    import fitz
    print("SUCCESS: Fitz is installed and working!")
    print(f"Version: {fitz.__doc__}")
except ImportError:
    print("FAILURE: Python still can't find fitz.")