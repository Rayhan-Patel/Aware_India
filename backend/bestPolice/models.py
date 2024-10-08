from django.db import models

class ShortlistedPoliceStation(models.Model):
    sr = models.AutoField(primary_key=True)
    police_name = models.CharField(max_length=255)
    district = models.CharField(max_length=255)
    state_ut = models.CharField(max_length=255)

    class Meta:
        db_table = 'bestpolice_shortlistedpolicestation'

    def __str__(self):
        return f"{self.police_name} - {self.district}, {self.state_ut}"
class ShortlistedPoliceStationAddress(models.Model):
    addId = models.AutoField(primary_key=True)
    sr = models.ForeignKey(ShortlistedPoliceStation, on_delete=models.CASCADE)
    address_line1 = models.CharField(max_length=255)
    state = models.CharField(max_length=255)
    postal_code = models.CharField(max_length=20)
    phone_number = models.CharField(max_length=20, blank=True, null=True)

    def __str__(self):
        return f"{self.address_line1}, {self.state}, {self.postal_code}"

    class Meta:
        db_table = 'address'  # Specify the new table name
