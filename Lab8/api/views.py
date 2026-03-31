from django.shortcuts import render
from django.http import JsonResponse
from .models import Product
from .models import Category

# Products

def products_list(request):
    products = Product.objects.all()
    data = []

    for p in products:
        data.append({
            "id": p.id,
            "name": p.name,
            "price": p.price,
        })

    return JsonResponse(data, safe=False)

def product_detail(request, id):
    product = Product.objects.get(id=id)

    data = {
        "id": product.id,
        "name": product.name,
        "price": product.price,
    }

    return JsonResponse(data)



# Categories

def categories_list(request):
    categories = Category.objects.all()
    data = []

    for c in categories:
        data.append({
            "id": c.id,
            "name": c.name,
        })

    return JsonResponse(data, safe=False)

def category_detail(request, id):
    category = Category.objects.get(id=id)

    data = {
        "id": category.id,
        "name": category.name,
    }

    return JsonResponse(data)

def category_products(request, id):
    products = Product.objects.filter(category_id=id)
    data = []

    for p in products:
        data.append({
            "id": p.id,
            "name": p.name,
            "price": p.price,
        })

    return JsonResponse(data, safe=False)