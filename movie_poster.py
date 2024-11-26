import requests

# TMDB API 설정
API_KEY = '1d458bbfca724fc7e5c0b40324efaec2'  # TMDB에서 발급받은 API 키
BASE_URL = 'https://api.themoviedb.org/3'
IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500'

def get_popular_movies(api_key):
    """
    TMDB API를 사용해 인기 영화를 가져옵니다.
    """
    url = f"{BASE_URL}/movie/popular"
    params = {
        'api_key': api_key,
        'language': 'en-US',
        'page': 1
    }
    response = requests.get(url, params=params)

    if response.status_code == 200:
        return response.json()['results']
    else:
        print(f"Error: {response.status_code}, {response.text}")
        return []

def extract_movie_data(movies):
    """
    영화 목록에서 제목과 포스터 URL을 추출합니다.
    """
    extracted_data = []
    for movie in movies:
        title = movie['title']
        poster_path = movie['poster_path']
        poster_url = f"{IMAGE_BASE_URL}{poster_path}" if poster_path else "No Image"
        extracted_data.append({'title': title, 'poster_url': poster_url})
    return extracted_data

if __name__ == "__main__":
    # 인기 영화 가져오기
    movies = get_popular_movies(API_KEY)

    # 영화 제목과 포스터 URL 추출
    movie_data = extract_movie_data(movies)

    # 출력
    for movie in movie_data:
        print(f"Title: {movie['title']}, Poster URL: {movie['poster_url']}")
