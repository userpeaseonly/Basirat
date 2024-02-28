from django.contrib.auth.decorators import login_required
from django.db.models import F
from django.shortcuts import render

from attendance.models import AttendanceStudent


@login_required(login_url='authentication:login')
def home(request):
    the_student = request.user
    try:
        percentage_of_attendance = attendance(request)
    except Exception:
        percentage_of_attendance = all_attendance(request).__round__(2)
    context = {
        'the_student': the_student,
        'percentage_of_attendance': percentage_of_attendance
    }
    return render(request, 'main/home.html', context)


def attendance(request):
    student = request.user
    group = student.student.group
    percentage_of_attendance = AttendanceStudent.objects.filter(attendance__group=group, student=student.student,
                                                                present=True).count() / AttendanceStudent.objects.filter(
        attendance__group=group, student=student.student).count() * 100
    return percentage_of_attendance


def all_attendance(request):
    attendance_students = AttendanceStudent.objects.filter(
        present=True).count() / AttendanceStudent.objects.all().count() * 100
    return attendance_students
