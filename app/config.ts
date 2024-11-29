// use NODE_ENV to not have to change config based on where it's deployed
// ngrok 서버 킬때는 http://localhost:3000자리에 ngrok에서 얻은 주소로 바꿔줄것(예: https://99fe-175-115-245-58.ngrok-free.app)
//그래야 프레임 벨리데이터에서 동작함
export const NEXT_PUBLIC_URL =
  process.env.NODE_ENV == 'development' ? 'https://4491-175-115-245-58.ngrok-free.app' : 'https://hemanruru-moxiestat.vercel.app';

