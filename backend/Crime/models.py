from django.db import models

# Create your models here.
class Crime_report(models.Model):
    report_number= models.AutoField(primary_key=True)
    date_reported= models.DateField()
    date_of_occurrence= models.DateField()
    time_of_occurrence= models.TimeField()
    city= models.CharField(max_length=100)
    crime_code = models.TextField()
    crime_description = models.TextField()
    victim_age = models.IntegerField()
    victim_gender = models.CharField(max_length=10)
    weapon_used = models.CharField(max_length=100, null=True, blank=True)
    crime_domain = models.CharField(max_length=100)
    police_deployed = models.BooleanField(default=False)
    case_closed = models.BooleanField(default=False)
    date_case_closed = models.DateField(null=True, blank=True)
    state = models.CharField(max_length=100)