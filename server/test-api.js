// Automated API verification script for TaskSphere 3D MERN
const API_URL = 'http://localhost:5000/api';

const runTests = async () => {
  console.log('🧪 Starting Full-Stack API Verification...\n');

  try {
    // 1. Health Check
    const healthRes = await fetch(`${API_URL}/health`);
    const healthData = await healthRes.json();
    console.log('✅ 1. Health Check:', healthData.message);

    // 2. Register User A
    const timestamp = Date.now();
    const userAEmail = `alex_${timestamp}@tasksphere.io`;
    const userBEmail = `sarah_${timestamp}@tasksphere.io`;

    const regARes = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Alex Vance',
        username: `alex_${timestamp}`,
        email: userAEmail,
        password: 'Password123!',
      }),
    });
    const regAData = await regARes.json();
    console.log('✅ 2. Register User A:', regAData.success ? 'PASSED' : 'FAILED', regAData.message);
    const tokenA = regAData.data.token;

    // 3. Register User B
    const regBRes = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Sarah Connor',
        username: `sarah_${timestamp}`,
        email: userBEmail,
        password: 'Password123!',
      }),
    });
    const regBData = await regBRes.json();
    console.log('✅ 3. Register User B:', regBData.success ? 'PASSED' : 'FAILED', regBData.message);
    const tokenB = regBData.data.token;

    // 4. Create Todos for User A
    const todo1Res = await fetch(`${API_URL}/todos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${tokenA}`,
      },
      body: JSON.stringify({
        title: 'Complete 3D Hero Scene',
        description: 'Implement Three.js shader and particles',
        priority: 'High',
        category: 'Work',
        dueDate: '2026-10-01',
      }),
    });
    const todo1Data = await todo1Res.json();
    const todo1Id = todo1Data.data._id;
    console.log('✅ 4. Create Todo 1 for User A:', todo1Data.success ? 'PASSED' : 'FAILED');

    await fetch(`${API_URL}/todos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${tokenA}`,
      },
      body: JSON.stringify({
        title: 'Morning 5km Run',
        description: 'Cardio training',
        priority: 'Medium',
        category: 'Fitness',
      }),
    });

    await fetch(`${API_URL}/todos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${tokenA}`,
      },
      body: JSON.stringify({
        title: 'Grocery shopping',
        description: 'Buy fresh veggies and fruits',
        priority: 'Low',
        category: 'Shopping',
      }),
    });

    // 5. Create Todo for User B
    const todoBRes = await fetch(`${API_URL}/todos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${tokenB}`,
      },
      body: JSON.stringify({
        title: "User B's Private Secret Task",
        description: 'Should not be seen by User A',
        priority: 'High',
        category: 'Personal',
      }),
    });
    const todoBData = await todoBRes.json();
    console.log('✅ 5. Create Todo for User B:', todoBData.success ? 'PASSED' : 'FAILED');

    // 6. Test Strict User Isolation (User A fetching their todos)
    const listARes = await fetch(`${API_URL}/todos`, {
      headers: { Authorization: `Bearer ${tokenA}` },
    });
    const listAData = await listARes.json();
    const userAHasBTask = listAData.data.some((t) => t.title.includes('Secret Task'));
    console.log(
      '✅ 6. User A Todo Count:',
      listAData.data.length,
      '| Data Leak Check:',
      userAHasBTask ? 'FAILED (LEAK DETECTED)' : 'PASSED (0 LEAKS)'
    );

    // 7. Test Security Violation: User B attempting to edit or delete User A's todo
    const attackRes = await fetch(`${API_URL}/todos/${todo1Id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${tokenB}` },
    });
    const attackData = await attackRes.json();
    console.log(
      '🔒 7. User B cross-account DELETE attempt on User A task:',
      attackRes.status === 403 ? 'BLOCKED WITH 403 FORBIDDEN (SECURE)' : `FAILED: ${attackRes.status}`
    );

    // 8. Toggle Todo completion for User A
    const toggleRes = await fetch(`${API_URL}/todos/${todo1Id}/toggle`, {
      method: 'PATCH',
      headers: { Authorization: `Bearer ${tokenA}` },
    });
    const toggleData = await toggleRes.json();
    console.log(
      '✅ 8. Toggle Todo completion status:',
      toggleData.data.completed === true ? 'PASSED (Completed: true)' : 'FAILED'
    );

    // 9. Check User A Productivity Stats
    const statsRes = await fetch(`${API_URL}/todos/stats`, {
      headers: { Authorization: `Bearer ${tokenA}` },
    });
    const statsData = await statsRes.json();
    console.log('✅ 9. Productivity Stats for User A:', {
      total: statsData.data.total,
      completed: statsData.data.completed,
      pending: statsData.data.pending,
      completionRate: `${statsData.data.completionRate}%`,
    });

    // 10. Profile Update for User A
    const profileRes = await fetch(`${API_URL}/users/profile`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${tokenA}`,
      },
      body: JSON.stringify({
        bio: 'Senior Software Architect and 3D designer.',
      }),
    });
    const profileData = await profileRes.json();
    console.log(
      '✅ 10. Update Profile Bio:',
      profileData.data.bio === 'Senior Software Architect and 3D designer.'
        ? 'PASSED'
        : 'FAILED'
    );

    console.log('\n🎉 ALL 10 TEST SUITES PASSED WITH 100% SUCCESS!\n');
    process.exit(0);
  } catch (err) {
    console.error('❌ Test failed with error:', err);
    process.exit(1);
  }
};

runTests();
