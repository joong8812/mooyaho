from django.contrib.auth.decorators import login_required
from django.shortcuts import render, redirect

from post.post_models import Post


@ login_required(login_url='login')
def post_list(request):
    if request.method == 'GET':
        # 모든 글 가져오기, 포스팅 날짜 역순으로 정렬
        all_post = Post.objects.all().order_by('-created_at')
        post_list_context = {
            'all_post': all_post
        }
        return render(request, 'post/posts.html', post_list_context)


@login_required(login_url='login')
def post_detail(request, pk):
    if request.method == 'GET':
        # 선택한 글의 id를 받아서 해당 id에 맞는 글 가져오기
        clicked_post = Post.objects.get(id=pk)
        post_detail_context = {
            'clicked_post': clicked_post
        }
        return render(request, 'post/detail.html', post_detail_context)


@login_required(login_url='login')
def post(request):
    if request.method == 'GET':
        return render(request, 'post/new.html')

    elif request.method == 'POST':
        new_posting = Post.objects.create(
            hiking_img=request.FILES['hiking_img'],
            title=request.POST['title'],
            mountain_id=request.POST['inputMt'],
            content=request.POST['inputReview'],
            rating=request.POST['rating']
        )
        new_posting.save()
        return redirect('/posts/' + str(new_posting.id))

    elif request.method == 'PUT':
        posting = Post.objects.get(id=id)
        return redirect('/posts/' + str(posting.id))

    elif request.method == 'DELETE':
        posting = Post.objects.get(id=id)
        posting.delete()
        return redirect('posts')