import csv
from django.core.management.base import BaseCommand
from bestPolice.models import ShortlistedPoliceStation, ShortlistedPoliceStationAddress

class Command(BaseCommand):
    help = 'Import data from CSV files into the ShortlistedPoliceStation and ShortlistedPoliceStationAddress models'

    def add_arguments(self, parser):
        parser.add_argument('--police', type=str, help='Path to the police CSV file')
        parser.add_argument('--adress', type=str, help='Path to the address CSV file')

    def handle(self, *args, **options):
        if options['police']:
            self.import_police_data(options['police'])
        if options['adress']:
            self.import_address_data(options['adress'])

    def import_police_data(self, file_path):
        with open(file_path, 'r') as file:
            reader = csv.DictReader(file)
            for row in reader:
                ShortlistedPoliceStation.objects.create(
                    police_name=row['police_name'],
                    district=row['district'],
                    state_ut=row['state_ut']
                )
        self.stdout.write(self.style.SUCCESS('Successfully imported police data'))

    def import_address_data(self, file_path):
        with open(file_path, 'r') as file:
            reader = csv.DictReader(file)
            for row in reader:
                ShortlistedPoliceStationAddress.objects.create(
                    address_line1=row['address_line1'],
                    state=row['state'],
                    postal_code=row['postal_code'],
                    phone_number=row.get('phone_number', ''),
                    sr_id=row['sr_id'],
                )
        self.stdout.write(self.style.SUCCESS('Successfully imported address data'))
