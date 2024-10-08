import csv
from django.core.management.base import BaseCommand
from Crime.models import Crime_report
from datetime import datetime

class Command(BaseCommand):
    help = 'Import crime reports from a CSV file'

    def add_arguments(self, parser):
        parser.add_argument('csv_file', type=str, help='The path to the CSV file')

    def handle(self, *args, **kwargs):
        csv_file = kwargs['csv_file']
        with open(csv_file, newline='', encoding='utf-8') as file:
            reader = csv.DictReader(file)

            for row in reader:
                try:
                    # Parse boolean fields for police_deployed and case_closed
                    police_deployed = row['Police_Deployed'].lower() == 'yes'
                    case_closed = row['Case_Closed'].lower() == 'yes'

                    # Handle nullable fields
                    date_case_closed=row.get('Date_Case_Closed', None)
                    weapon_used = row['Weapon_Used'] if row['Weapon_Used'] else None

                    # Create CrimeReport object and save to the database
                    Crime_report.objects.create(
                        report_number=row['Report_Number'],
                        date_reported=datetime.strptime(row['Date_Reported'], '%d-%m-%Y %H:00').date(),
                        date_of_occurrence=datetime.strptime(row['Date_of_Occurrence'], '%m-%d-%Y %H:%M').date(),
                        time_of_occurrence=datetime.strptime(row['Time_of_Occurrence'], '%d-%m-%Y %H:%M').time(),
                        city=row['City'],
                        crime_code=row['Crime_Code'],
                        crime_description=row['Crime_Description'],
                        victim_age=int(row['Victim_Age']),
                        victim_gender=row['Victim_Gender'],
                        weapon_used=weapon_used,
                        crime_domain=row['Crime_Domain'],
                        police_deployed=police_deployed,
                        case_closed=case_closed,
                        date_case_closed=date_case_closed,
                        state=row['State']
                    )

                    self.stdout.write(self.style.SUCCESS(f"Successfully imported report {row['Report_Number']}"))

                except Exception as e:
                    self.stdout.write(self.style.ERROR(f"Error importing report {row['Report_Number']}: {e}"))
                    print(datetime.strptime(row['Date_Reported'], '%d-%m-%Y %H:%M').time())

        self.stdout.write(self.style.SUCCESS("Finished importing crime reports"))

