from rest_framework import serializers
from .models import ShortlistedPoliceStation,ShortlistedPoliceStationAddress
class ShortlistedPoliceStationSerializer(serializers.ModelSerializer):
    class Meta:
        model = ShortlistedPoliceStation
        fields = ['sr', 'police_name', 'district', 'state_ut']


class ShortlistedPoliceStationAddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = ShortlistedPoliceStationAddress
        fields = ['addId', 'sr', 'address_line1', 'state', 'postal_code', 'phone_number']