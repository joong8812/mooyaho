$(function () {
    changeSearchToAdd();
})

function changeSearchToAdd() {
    // img = document.getElementsByClassName("meterial-icons");
    const img1 = document.getElementById("search-wrapper");
    img1.removeEventListener('click', clickedSearchButton);
    img1.innerHTML = `<div onclick="location.href='/posts/new'"
        style="color: black;">
        <span class="material-icons" style="font-size: 2rem; cursor: pointer;">
        create
        </span>
    </div>`;
}

function modalReport() {
    const modal = document.querySelector(".modal");
    modal.style.display = 'block';
}

function modalClose() {
    const modal = document.querySelector(".modal");
    const closeBtn = document.querySelector("#modalClose");
    modal.style.display = 'none';
}

// 글 수정 페이지 요청 구현
$(document).on('click', '#post-to-edit-btn', function () {
    // 해당 글 id 가져오기
    const pk = $(this).attr('name');

    // 수정 페이지로 이동
    window.location = '/posts/' + pk + '/changes/';
})

// 글 수정 구현 - it doesn't working yet.
$('#post-edit-btn').click(function () {
    // 수정 승인 요청 메시지
    let post_edit_confirm = confirm('이대로 수정하시겠습니까?');

    // 삭제 승인 시
    if (post_edit_confirm === true) {
        // 해당 글 id 가져오기
        const pk = $(this).attr('name');

        // 백엔드로 보낼 데이터 작성
        let params = {'post_id': pk};

        // 비동기 통신 시작
        $.ajax({
            url: '/posts/' + pk + '/changes/',
            type: 'PUT',
            data: JSON.stringify(params),
            beforeSend: function (xhr) {
                xhr.setRequestHeader('X-CSRFToken', csrfToken);
            },
            success: function (data) {
                console.log(data);
                if (data.result === 'ok') {
                    window.location = '/posts/' + pk + '/';
                }
            },
            error: function (request, status, error) {
                alert('오류가 발생했습니다!');
            }
        })
    }
})

// 글 삭제 구현
$('#post-delete-btn').click(function () {
    // 삭제 승인 요청 메시지
    let post_delete_confirm = confirm('글을 삭제할까요?');

    // 삭제 승인 시
    if (post_delete_confirm === true) {
        // 해당 글 id 가져오기
        const pk = $(this).attr('name');

        // 백엔드로 보낼 데이터 작성
        let params = {'post_id': pk};

        // 비동기 통신 시작
        $.ajax({
            // url: '/posts/' + pk + '/deletion/',
            url: '/posts/' + pk + '/changes/',
            type: 'DELETE',
            data: JSON.stringify(params),
            beforeSend: function (xhr) {
                xhr.setRequestHeader("X-CSRFToken", csrfToken);
            },
            success: function (data) {
                console.log(data)
                if (data.result === 'ok') {
                    alert('글을 삭제했습니다.');
                    window.location = '/posts/';
                }
            },
            error: function (request, status, error) {
                alert('오류가 발생했습니다!');
            }
        })
    }
})

// 좋아요 구현(참고 자료: https://wonjongah.tistory.com/41)
// csrf 토큰 가져오기
const csrfToken = document.querySelector('input[name=csrfmiddlewaretoken]').value;
$('.post_like').click(function () {
    // 해당 글 id 가져오기
    const pk = $(this).attr('id');

    // 비동기 통신 시작
    $.ajax({
        url: '/posts/' + pk + '/likes/',
        type: 'POST',
        data: {'pk': pk},
        dataType: 'json',
        beforeSend: function (xhr) {
            xhr.setRequestHeader("X-CSRFToken", csrfToken);
        },
        success: function (response) {
            $('#like_count-' + pk).html('좋아요&nbsp;' + response.likes_count + '개');
            if (response.message === '좋아요') {
                $('#like_heart' + pk).attr({'class': 'fas fa-heart fa-2x', 'style': 'color:#bd1f00'});
            } else if (response.message === '좋아요 취소') {
                $('#like_heart' + pk).attr({'class': 'far fa-heart fa-2x', 'style': 'color:#3d3d3d'});
            }
        },
        error: function (request, status, error) {
            alert('오류가 발생했습니다!');
        }
    })
})

// 댓글 입력 내용 있을 때만 게시 버튼 활성화
$('#comments').on('input paste', function (){
    if($('#comments').val() === ''){
        $('#repleBtn').attr('disabled', true);
    } else {
        $('#repleBtn').attr('disabled', false);
    }
})

// 댓글 작성 구현
$('#repleBtn').click(function () {
    // 해당 글 id 가져오기
    const pk = $(this).attr('name');

    // 댓글 작성자 가져오기
    let author = document.querySelector('#author').innerText;

    // 댓글 내용 가져오기
    let comment = document.querySelector('#comments').value;

    // 백엔드로 넘길 데이터 작성
    let params = {
        'author': author,
        'comment': comment,
        'post_id': pk
    }

    // 비동기 통신 시작
    $.ajax({
        url: '/posts/' + pk + '/comments/',
        type: 'POST',
        data: JSON.stringify(params),
        beforeSend: function (xhr) {
            xhr.setRequestHeader("X-CSRFToken", csrfToken);
        },
        success: function (data) {
            if (data.result === 'ok') {
                // 댓글 추가
                $('.comment-area').append(`
                <div class="comment-${data.comment_id}">
                    <span>${data.author}</span>
                    <span>${data.comment}</span>
                    <button type="button" id="repleDeleteBtn" class="btn btn-link" name="${data.post_id}"
                           onclick="repleDelete(${data.comment_id})">
                            <span class="material-icons">
                                    delete
                            </span>
                    </button>
                </div>`);

                // 댓글 입력창 내용 초기화
                $('#comments').val('');
            }
        },
        error: function () {
            alert('오류가 발생했습니다!');
        }
    })
})

// 댓글 삭제 구현
function repleDelete(id) {
    // 삭제 승인 요청 메시지
    let comment_delete_confirm = confirm('댓글을 삭제할까요?');

    // 삭제 승인 시
    if (comment_delete_confirm === true) {
        // 해당 글 id 가져오기
        const pk = $('#repleDeleteBtn').attr('name');

        // 백엔드로 보낼 데이터 작성
        let params = {'comment_id': id}

        // 비동기 통신 시작
        $.ajax({
            url: '/posts/' + pk + '/comments/',
            type: 'DELETE',
            data: JSON.stringify(params),
            beforeSend: function (xhr) {
                xhr.setRequestHeader("X-CSRFToken", csrfToken);
            },
            success: function (data) {
                console.log(data)
                if (data.result === 'ok') {
                    // 댓글 삭제 처리
                    $('.comment-' + id).remove();
                }
            },
            error: function () {
                alert('오류가 발생했습니다!')
            }
        })
    }
}

// 신고하기 구현
$('#reportBtn').click(function () {
    // 신고 요청 확인
    let report_confirm = confirm('이 글을 신고하시겠습니까?');

    // 신고 처리
    if (report_confirm === true) {
        // 해당 글 id 가져오기
        const pk = $(this).attr('name');

        // 신고자 가져오기
        let report_user = document.querySelector('#report-user').innerText;

        // 신고 내용 가져오기
        let content = document.querySelector('#contents').value;

        // 백엔드로 넘길 데이터 작성
        let params = {
            'author': report_user,
            'content': content,
        }

        // 비동기 통신 시작
        $.ajax({
            url: '/posts/' + pk + '/reports/',
            type: 'POST',
            data: JSON.stringify(params),
            beforeSend: function (xhr) {
                xhr.setRequestHeader("X-CSRFToken", csrfToken);
            },
            success: function (data) {
                alert(data.author + '님의 신고를 접수했습니다. 신고내용은 고객센터-리뷰 에서 확인하실 수 있습니다.')
                // 신고 내용 입력창 내용 초기화
                $('#contents').val('');
                // 모달 정의
                const modal = document.querySelector(".modal");
                // 모달 닫기
                modal.style.display = 'none';
            },
            error: function () {
                alert('오류가 발생했습니다!');
            }
        })
    }
})

/* infinite scroll 구현 */
const afterMeetSentinel = (entries, observer) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return; // entry intersecting 중 아니면 리턴
        if (scrollChk) return; // 페이지 데이터 불러오는 중에는 observer 기능 안함

        if (!isPageOver) {
            observer.observe(document.querySelector('#sentinel'));
            postPage += 1;
            getNextPage(postPage);
        } else {
            document.querySelector('#sentinel').classList.add('hide');
        }
    });
}

// 다음 글 페이지를 요청
const getNextPage = (reqPage) => {
    const param = {
        'req_page': reqPage
    }

    $.ajax({
        url: '/posts/',
        data: param,
        method: 'GET',
        dataType: 'json',
        success: function(result) {
            const posts = JSON.parse(result.posts);
            const extra_info = result.extra_info;
            if (extra_info.length > 0 ) {
                showPosts(posts, extra_info);
            } else {
                isPageOver = true;
            }
        },
        error: function(error) {
            console.log(error);
        },
        beforeSend: function() {
            scrollChk = true;
            document.querySelector('.spinner-wrapper').classList.remove('hide');
        },
        complete: function() {
            scrollChk = false;
            document.querySelector('.spinner-wrapper').classList.add('hide');
        }
    })
}

// ajax로 가져 온 글을 보여준다
const showPosts = (posts, extra_info) => {
    postList = document.querySelector('#post-list');
    posts.forEach((post, index) => {
        postList.innerHTML += getPostBox(post, extra_info[index]);
    })
}

// 각 글의 html을 구성하여 리턴
const getPostBox = (post, extra_info) => {
    const id = post.pk;
    const info = post.fields;
    
    let postBoxHtml = `
    <div class="post-box" onclick="location.href='/posts/${id}/'">
        <div class="writer-box">
            <div class="writer-img-wrapper">
                <img src="${extra_info[0]}" alt="">
            </div>
            <div class="writer-info">
                <a href="/mypage/${extra_info[1]}/"><span>${extra_info[2]}</span></a>
                <div id="mountain-info">
                    <span>${info.mountain_name}</span>
    `
    if (parseInt(info.mountain_id) < 101) {
    postBoxHtml += `
                    <a href="/mountains_detail/${info.mountain_id}/">
                        <span class="material-icons mountain-icon">image_search</span>
                    </a>
                    `
    }
    postBoxHtml += `
                </div>
            </div>
        </div>
        <div class="image-box">
            <img src="${extra_info[3]}" alt="사진"/>
        </div>
        <div class="content-box">
            <div class="title">
                <h3>${info.title}</h3>
            </div>
            <div class="post-text">
            `
    if (info.content.length > 20) {
        const slicedContent = info.content.slice(0, 20);
        postBoxHtml += `
            <p>${slicedContent}...</p>
        `
    } else {
        postBoxHtml += `
            <p>${info.content}</p>
        `
    }
    postBoxHtml += `
            </div>
            <div class="post-time">
                <span>${extra_info[4]}</span>
            </div>
        </div>
    </div>
    `
    return postBoxHtml;
}

let postPage = 1; // 페이지 초기값
let scrollChk = false; // 스크롤 체크
let isPageOver = false; // 페이지 더 있는지 알려주는 변수
document.addEventListener("DOMContentLoaded", function () {
    io = new IntersectionObserver(afterMeetSentinel);
    io.observe(document.querySelector('#sentinel'));
});