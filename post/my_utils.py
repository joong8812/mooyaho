import datetime

def elapsed_time(post_time):
    elapsed_time = datetime.datetime.utcnow() - post_time.replace(tzinfo=None)

    m, s = divmod(elapsed_time.seconds, 60)
    h, m = divmod(m, 60)
    d = elapsed_time.days
    y, d = divmod(d, 365)

    if y > 0:
        elapsed_time = f'{y}년 전'
    elif y == 0 and d > 0:
        elapsed_time = f'{d}일 전'
    elif d == 0 and h > 0:
        elapsed_time = f'{h}시간 전'
    elif h == 0 and m > 0:
        elapsed_time = f'{m}분 전'
    else:
        elapsed_time = f'방금 전'

    return elapsed_time