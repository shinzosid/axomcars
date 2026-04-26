import openpyxl

try:
    wb = openpyxl.load_workbook('outlets.xlsx')
    sheet = wb.active
    for row in sheet.iter_rows(values_only=True):
        print(row)
except Exception as e:
    print(f"Error: {e}")
