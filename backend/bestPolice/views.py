from django.http import JsonResponse
from .models import ShortlistedPoliceStationAddress

def search_police_stations(request):
    state = request.GET.get('state', '').strip()  # Strip any extra spaces
    if not state:
        return JsonResponse({'error': 'State parameter is required'}, status=400)

    try:
        stations = ShortlistedPoliceStationAddress.objects.filter(state__icontains=state).select_related('sr')
        if not stations.exists():
            return JsonResponse({'message': 'No records found'}, status=200)  # Return 200 OK with message
        data = list(stations.values('addId', 'sr__police_name', 'address_line1', 'state', 'postal_code', 'phone_number'))
        return JsonResponse(data, safe=False)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)
