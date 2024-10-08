from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from newsdataapi import NewsDataApiClient
from django.conf import settings
from .models import Crime_report
from datetime import date
from django.db.models import Count
import pandas as pd

df=pd.read_csv('csv/poptable.csv')
df

@api_view(['GET'])
def home(request):
    response={
        "news": {
            "status": "success",
            "totalResults": 14,
            "results": [
                {
                    "article_id": "e62a769514c98160faefff772e4c4857",
                    "title": "Tamil Nadu: Over 100 people, including children, fall sick after eating chicken biryani at a DMK event months after hooch tragedy claimed 65 lives",
                    "link": "https://www.opindia.com/2024/09/tamil-nadu-over-100-people-including-children-fall-sick-after-eating-chicken-biryani-at-a-dmk-event/",
                    "keywords": [
                        "biryani",
                        "tamil nadu",
                        "dmk",
                        "news reports",
                        "editor's picks",
                        "crime"
                    ],
                    "creator": [
                        "OpIndia Staff"
                    ],
                    "video_url": 'null',
                    "description": "Later, it came to light that the DMK party workers had lured people to the party event by giving them food tokens.",
                    "content": "ONLY AVAILABLE IN PAID PLANS",
                    "pubDate": "2024-09-14 15:01:02",
                    "pubDateTZ": "UTC",
                    "image_url": "https://i0.wp.com/www.opindia.com/wp-content/uploads/2024/09/Untitled-design-2024-09-14T194527.317.jpg?fit=696%2C398&ssl=1",
                    "source_id": "opindia",
                    "source_priority": 37271,
                    "source_name": "Op India",
                    "source_url": "https://www.opindia.com",
                    "source_icon": "https://i.bytvi.com/domain_icons/opindia.png",
                    "language": "english",
                    "country": [
                        "india"
                    ],
                    "category": [
                        "crime"
                    ],
                    "ai_tag": "ONLY AVAILABLE IN PROFESSIONAL AND CORPORATE PLANS",
                    "sentiment": "ONLY AVAILABLE IN PROFESSIONAL AND CORPORATE PLANS",
                    "sentiment_stats": "ONLY AVAILABLE IN PROFESSIONAL AND CORPORATE PLANS",
                    "ai_region": "ONLY AVAILABLE IN CORPORATE PLANS",
                    "ai_org": "ONLY AVAILABLE IN CORPORATE PLANS",
                    "duplicate": 'false',
                },
                {
                    "article_id": "e5b764c1a58908a3e29579a3bdef57fb",
                    "title": "Mumbai`s Nair hospital professor suspended over sexual harassment charges",
                    "link": "https://www.mid-day.com/mumbai/mumbai-crime-news/article/associate-professor-of-nair-hospital-suspended-for-sexually-harassing-medical-student-mumbai-civic-body-23392966",
                    "keywords": [
                        "mumbai crime news"
                    ],
                    "creator": [
                        "Mid-day"
                    ],
                    "video_url": 'null',
                    "description": "The Mumbai civic corporation on Saturday stated that an associate professor of BYL Nair Hospital has been suspended for allegedly sexually harassing a medical student",
                    "content": "ONLY AVAILABLE IN PAID PLANS",
                    "pubDate": "2024-09-14 13:42:49",
                    "pubDateTZ": "UTC",
                    "image_url": "https://images.mid-day.com/images/images/2024/sep/Nair-hospital-aw_d_d.jpg",
                    "source_id": "mid_day",
                    "source_priority": 4893,
                    "source_name": "Mid-day",
                    "source_url": "https://www.mid-day.com",
                    "source_icon": "https://i.bytvi.com/domain_icons/mid_day.png",
                    "language": "english",
                    "country": [
                        "india"
                    ],
                    "category": [
                        "crime"
                    ],
                    "ai_tag": "ONLY AVAILABLE IN PROFESSIONAL AND CORPORATE PLANS",
                    "sentiment": "ONLY AVAILABLE IN PROFESSIONAL AND CORPORATE PLANS",
                    "sentiment_stats": "ONLY AVAILABLE IN PROFESSIONAL AND CORPORATE PLANS",
                    "ai_region": "ONLY AVAILABLE IN CORPORATE PLANS",
                    "ai_org": "ONLY AVAILABLE IN CORPORATE PLANS",
                    "duplicate": 'false',
                },
                {
                    "article_id": "9ff721fadf7dcd860ad54390c4dcb1ee",
                    "title": "Thane cop demoted for a year over objectionable post on PM, Maharashtra CM",
                    "link": "https://www.mid-day.com/mumbai/mumbai-crime-news/article/thane-cop-demoted-for-a-year-over-objectionable-post-on-pm-maharashtra-cm-23392888",
                    "keywords": [
                        "mumbai crime news"
                    ],
                    "creator": [
                        "Mid-day"
                    ],
                    "video_url": 'null',
                    "description": "A personnel serving as havaldar in Thane Police was demoted to the rank of constable for one year for posting objectionable content about the prime minster, the Maharashtra Chief Minister",
                    "content": "ONLY AVAILABLE IN PAID PLANS",
                    "pubDate": "2024-09-14 12:24:37",
                    "pubDateTZ": "UTC",
                    "image_url": "https://images.mid-day.com/images/images/2024/sep/cop-rep_d_d.jpg",
                    "source_id": "mid_day",
                    "source_priority": 4893,
                    "source_name": "Mid-day",
                    "source_url": "https://www.mid-day.com",
                    "source_icon": "https://i.bytvi.com/domain_icons/mid_day.png",
                    "language": "english",
                    "country": [
                        "india"
                    ],
                    "category": [
                        "crime"
                    ],
                    "ai_tag": "ONLY AVAILABLE IN PROFESSIONAL AND CORPORATE PLANS",
                    "sentiment": "ONLY AVAILABLE IN PROFESSIONAL AND CORPORATE PLANS",
                    "sentiment_stats": "ONLY AVAILABLE IN PROFESSIONAL AND CORPORATE PLANS",
                    "ai_region": "ONLY AVAILABLE IN CORPORATE PLANS",
                    "ai_org": "ONLY AVAILABLE IN CORPORATE PLANS",
                    "duplicate": 'false',
                },
                {
                    "article_id": "dc66186160fd04810e6a976e3e40a749",
                    "title": "West Bengal: Idols of Goddess Durga and other Hindu deities found desecrated ahead of Puja, BJP shares video",
                    "link": "https://www.opindia.com/2024/09/idol-desecration-vandalism-goddess-durga-saraswati-lakshmi-jharia-hooghly-west-bengal/",
                    "keywords": [
                        "desecration",
                        "idol vandalism",
                        "crime",
                        "editor's picks",
                        "news reports",
                        "west bengal",
                        "hindu gods and goddesses"
                    ],
                    "creator": [
                        "OpIndia Staff"
                    ],
                    "video_url": 'null',
                    "description": "In a tweet, Amit Malviya said, \"In Jharia village (under Goghat PS in Hooghly), idols of Maa Durga, Lakshmi, and Saraswati were found desecrated - raped and defiled.\"",
                    "content": "ONLY AVAILABLE IN PAID PLANS",
                    "pubDate": "2024-09-14 10:07:12",
                    "pubDateTZ": "UTC",
                    "image_url": "https://i0.wp.com/www.opindia.com/wp-content/uploads/2024/09/idol-vandalism.jpg?fit=696%2C398&ssl=1",
                    "source_id": "opindia",
                    "source_priority": 37271,
                    "source_name": "Op India",
                    "source_url": "https://www.opindia.com",
                    "source_icon": "https://i.bytvi.com/domain_icons/opindia.png",
                    "language": "english",
                    "country": [
                        "india"
                    ],
                    "category": [
                        "crime"
                    ],
                    "ai_tag": "ONLY AVAILABLE IN PROFESSIONAL AND CORPORATE PLANS",
                    "sentiment": "ONLY AVAILABLE IN PROFESSIONAL AND CORPORATE PLANS",
                    "sentiment_stats": "ONLY AVAILABLE IN PROFESSIONAL AND CORPORATE PLANS",
                    "ai_region": "ONLY AVAILABLE IN CORPORATE PLANS",
                    "ai_org": "ONLY AVAILABLE IN CORPORATE PLANS",
                    "duplicate": 'false',
                },
                {
                    "article_id": "563eb09061fca285c2c157c18bda933a",
                    "title": "Badlapur citizens catch ‘phone thieves’, police let them slip away",
                    "link": "https://www.mid-day.com/mumbai/mumbai-crime-news/article/badlapur-citizens-catch-phone-thieves-police-let-them-slip-away-23393122",
                    "keywords": [
                        "mumbai crime news"
                    ],
                    "creator": [
                        "Mid-day"
                    ],
                    "video_url": 'null',
                    "description": "The police claim that the suspects were sent home as they are minors, adding that they have the names and addresses for all three and would investigate the case",
                    "content": "ONLY AVAILABLE IN PAID PLANS",
                    "pubDate": "2024-09-14 07:20:00",
                    "pubDateTZ": "UTC",
                    "image_url": "https://images.mid-day.com/images/images/2024/sep/Phone-thieves_d.jpg",
                    "source_id": "mid_day",
                    "source_priority": 4893,
                    "source_name": "Mid-day",
                    "source_url": "https://www.mid-day.com",
                    "source_icon": "https://i.bytvi.com/domain_icons/mid_day.png",
                    "language": "english",
                    "country": [
                        "india"
                    ],
                    "category": [
                        "crime"
                    ],
                    "ai_tag": "ONLY AVAILABLE IN PROFESSIONAL AND CORPORATE PLANS",
                    "sentiment": "ONLY AVAILABLE IN PROFESSIONAL AND CORPORATE PLANS",
                    "sentiment_stats": "ONLY AVAILABLE IN PROFESSIONAL AND CORPORATE PLANS",
                    "ai_region": "ONLY AVAILABLE IN CORPORATE PLANS",
                    "ai_org": "ONLY AVAILABLE IN CORPORATE PLANS",
                    "duplicate": 'false',
                }
            ],
            "nextPage": "1726298400976294648"
        }
    }

    crimes = Crime_report.objects.values('state').annotate(crime_count=Count('report_number')).order_by('state')
    total=Crime_report.objects.all().count()
    statistic={'Sexual Assault':Crime_report.objects.filter(crime_description='SEXUAL ASSAULT').filter(date_of_occurrence__range=(date(2023,1,1),date(2023,12,31))).count(),
    'Homicide':Crime_report.objects.filter(crime_description='HOMICIDE').filter(date_of_occurrence__range=(date(2023,1,1),date(2023,12,31))).count(),
    'Kidnapping':Crime_report.objects.filter(crime_description='KIDNAPPING').filter(date_of_occurrence__range=(date(2023,1,1),date(2023,12,31))).count(),
    'Domestic Violence':Crime_report.objects.filter(crime_description='DOMESTIC VIOLENCE').filter(date_of_occurrence__range=(date(2023,1,1),date(2023,12,31))).count(),
    'Fraud':Crime_report.objects.filter(crime_description='FRAUD').filter(date_of_occurrence__range=(date(2023,1,1),date(2023,12,31))).count(),
    'Violent crime':Crime_report.objects.filter(crime_domain='Violent Crime').filter(date_of_occurrence__range=(date(2023,1,1),date(2023,12,31))).count()}
    return Response({'news':response['news']['results'],'statistic':statistic,'crimes':crimes,'total':total})

@api_view(['GET'])
def State_crime(request,state):
    crimes=Crime_report.objects.filter(state=state)[:10]
    print(state)
    return Response({'crime':crimes.values()})
