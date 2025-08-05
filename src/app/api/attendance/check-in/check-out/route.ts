export async function POST(req: Request) {
  const { userId } = getAuth(req);
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const attendance = await prisma.attendance.findFirst({
    where: { userId, date: { gte: today } },
  });

  if (!attendance || attendance.checkOut) {
    return NextResponse.json({ message: 'No check-in or already checked out' }, { status: 400 });
  }

  const updated = await prisma.attendance.update({
    where: { id: attendance.id },
    data: { checkOut: new Date() },
  });

  return NextResponse.json({ updated });
}
