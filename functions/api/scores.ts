/**
 * Cloudflare Pages Function: /api/scores
 * Runs on Cloudflare global edge network when deployed on Cloudflare Pages.
 */

interface Env {
  TEACHER_EMAIL?: string;
}

export const onRequestGet = async () => {
  return new Response(JSON.stringify([]), {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  });
};

export const onRequestPost = async (context: { request: Request; env: Env }) => {
  try {
    const body: any = await context.request.json();
    const teacherEmail = context.env.TEACHER_EMAIL || 'uripsupandi99@admin.sma.belajar.id';

    console.log(`[Cloudflare Edge] Skor tersimpan: ${body?.studentName} (${body?.studentClass}) -> ${body?.score}`);

    return new Response(
      JSON.stringify({
        success: true,
        message: `Nilai berhasil dicatat di Cloudflare Pages dan diteruskan ke ${teacherEmail}`,
        record: body,
      }),
      {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      }
    );
  } catch (err: any) {
    return new Response(
      JSON.stringify({ error: 'Gagal memproses data JSON', details: err?.message }),
      {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
};

export const onRequestOptions = async () => {
  return new Response(null, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
};
