from rest_framework.decorators import api_view
from rest_framework.response import Response
from Crime.models import Crime_report  # Import the User model
from .serializers import CrimeSerializer,RegisterCrimeSerializer  # Import the UserSerializer
from rest_framework import status
from rest_framework.pagination import PageNumberPagination
from django.contrib.auth import authenticate,login,logout
from django.contrib.auth.models import User
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json


@api_view(['GET'])
def View_crime(request):
    case_no = request.GET.get('case_no', '')
    crime_desc = request.GET.get('crime_desc', '')
    date_from = request.GET.get('date_from', '')
    date_to = request.GET.get('date_to', '')
    city = request.GET.get('city', '')
    state = request.GET.get('state', '')
    
    # Filter crimes based on query parameters
    crimes = Crime_report.objects.all()
    if case_no:
        crimes = crimes.filter(report_number=case_no)
    if crime_desc:
        crimes = crimes.filter(crime_description__icontains=crime_desc)
    if date_from:
        crimes = crimes.filter(date_reported__gte=date_from)
    if date_to:
        crimes = crimes.filter(date_reported__lte=date_to)
    if city:
        crimes = crimes.filter(city__icontains=city)
    if state:
        crimes = crimes.filter(state__icontains=state)

    total_results=crimes.count()
    # Paginate the queryset
    paginator = PageNumberPagination()
    paginator.page_size = 500  # Adjust page size as needed
    page_obj = paginator.paginate_queryset(crimes, request)
    
    # Serialize the paginated records
    serializer = CrimeSerializer(page_obj, many=True)
    
    return Response({
        'results': serializer.data,
        'current_page': paginator.page.number,
        'total_pages': paginator.page.paginator.num_pages,
        'total_results':total_results
    })

@api_view(['GET'])
def Register_field(request):
    domain=Crime_report.objects.values('crime_domain').distinct()
    return Response({'domain':domain})

@api_view(['POST'])
def Register_crime(request):
    if request.method == 'POST':
        serializer = RegisterCrimeSerializer(data=request.data)
        print("Successfully reach",request.data)
        if serializer.is_valid():
            serializer.save()  # Save the data to the Crime model
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@csrf_exempt  # Disable CSRF for API POST requests (since you’re likely testing via React)
def Admin_Login(request):
    if request.method == 'POST':
        data = json.loads(request.body)  # Parse JSON from the request body
        username = data.get('username')
        password = data.get('password')
        user = authenticate(username=username, password=password)
        if user is not None:
            return JsonResponse({
                'is_staff': user.is_staff,
            })
        else:
            return JsonResponse({'error': 'Invalid credentials'}, status=400)

# views.py

@csrf_exempt
def register(request):
    if request.method == 'POST':    
        data = json.loads(request.body)
        username = data.get('username')
        password = data.get('password')
        user =User.objects.create_user(username=username, password=password)
        login(request,user)
        return JsonResponse({'message': 'User created successfully'}, status=201)

@csrf_exempt
def Login_view1(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        username = data.get('username')
        password = data.get('password')
        user = authenticate(username=username, password=password)
        if user is not None:
            login(request, user)
            return JsonResponse({'message': 'Login successful'})
        else:
            return JsonResponse({'message': 'Invalid credentials'}, status=401)
    else:
        return JsonResponse({'message': 'Invalid credentials'}, status=401)


@csrf_exempt
def Logout_view(request):
    if request.method == 'POST':
        logout(request)
        return JsonResponse({'message': 'Logout successful'})



