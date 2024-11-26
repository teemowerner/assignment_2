import requests

# TMDB API Key
API_KEY = "1d458bbfca724fc7e5c0b40324efaec2"
BASE_URL = "https://api.themoviedb.org/3"

# 영화 목록 가져오기 함수
def get_popular_movies(api_key, page=1):
    url = f"{BASE_URL}/movie/popular"
    params = {
        "api_key": api_key,
        "language": "en-US",
        "page": page
    }
    response = requests.get(url, params=params)
    
    # 응답 확인
    if response.status_code == 200:
        data = response.json()
        return data['results']  # 영화 목록
    else:
        print(f"Error: {response.status_code}")
        return None

# 실행
movies = get_popular_movies(API_KEY)

if movies:
    for movie in movies[:5]:  # 5개만 출력
        print(f"Title: {movie['title']}")
        print(f"Release Date: {movie['release_date']}")
        print(f"Overview: {movie['overview']}")
        print("-" * 50)
