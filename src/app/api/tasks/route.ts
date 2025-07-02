// // app/api/tasks/route.ts
// import { auth } from '@clerk/nextjs/server';
// import { NextRequest, NextResponse } from 'next/server';
// import { prisma } from '../../../../lib/prisma';


// export async function POST(req: NextRequest) {
//    const { userId } = await auth(); // Clerk-authenticated user
//   if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

//   const data = await req.json();

//   try {
//     const task = await prisma.task.create({
//       data: {
//         title: data.title,
//         status: data.status,
//         tags: data.tags || [],
//         dueDate: data.dueDate ? new Date(data.dueDate) : null,
//         priority: data.priority || null,
//         assigneeId: data.assigneeId || null,
//         createdBy: userId,
//       },
//     });

//     return NextResponse.json({ success: true, task });
//   } catch (err) {
//     console.error(err);
//     return NextResponse.json({ error: 'Failed to create task' }, { status: 500 });
//   }
// }



// export async function GET(_req: NextRequest) {
// const { userId } = await auth();

//   if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

//   const tasks = await prisma.task.findMany({
//     where: {
//       OR: [
//         { assigneeId: userId },
//         { createdBy: userId },
//       ],
//     },
//     orderBy: {
//       createdAt: 'desc',
//     },
//   });

//   return NextResponse.json(tasks);
// }




import { auth } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';

type CreateTaskBody = {
  title: string;
  status: string;
  tags?: string[];
  dueDate?: string;
  priority?: string | null;
  assigneeId?: string | null;
};

export async function POST(req: NextRequest) {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  let data: CreateTaskBody;

  try {
    data = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  try {
    const task = await prisma.task.create({
      data: {
        title: data.title,
        status: data.status,
        tags: data.tags || [],
        dueDate: data.dueDate ? new Date(data.dueDate) : null,
        priority: data.priority || null,
        assigneeId: data.assigneeId || null,
        createdBy: userId,
      },
    });

    return NextResponse.json({ success: true, task });
  } catch (err) {
    console.error('Error creating task:', err);
    return NextResponse.json({ error: 'Failed to create task' }, { status: 500 });
  }
}

export async function GET() {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const tasks = await prisma.task.findMany({
      where: {
        OR: [{ assigneeId: userId }, { createdBy: userId }],
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json(tasks);
  } catch (err) {
    console.error('Error fetching tasks:', err);
    return NextResponse.json({ error: 'Failed to fetch tasks' }, { status: 500 });
  }
}
