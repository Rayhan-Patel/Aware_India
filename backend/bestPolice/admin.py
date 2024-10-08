from django.contrib import admin
from .models import ShortlistedPoliceStation, ShortlistedPoliceStationAddress

# Register the ShortlistedPoliceStation model
@admin.register(ShortlistedPoliceStation)
class ShortlistedPoliceStationAdmin(admin.ModelAdmin):
    list_display = ('sr', 'police_name', 'district', 'state_ut')  # Fields to display in the list view
    search_fields = ('police_name', 'district', 'state_ut')  # Fields to search by

# Register the ShortlistedPoliceStationAddress model
@admin.register(ShortlistedPoliceStationAddress)
class ShortlistedPoliceStationAddressAdmin(admin.ModelAdmin):
    list_display = ('addId', 'sr', 'address_line1', 'state', 'postal_code', 'phone_number')  # Fields to display in the list view
    search_fields = ('address_line1', 'state', 'postal_code', 'phone_number')  # Fields to search by
    list_filter = ('sr',)  # Add a filter for related ShortlistedPoliceStation