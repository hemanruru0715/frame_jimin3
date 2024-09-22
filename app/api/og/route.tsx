import { ImageResponse } from "@vercel/og";
import { NEXT_PUBLIC_URL } from '@/app/config';
import fs from 'fs';
import path from 'path';
import { fetchCoinData } from '@/app/utils/fetchCoinData'; // utils 폴더에서 함수 가져오기

//export const runtime = "edge";
export const dynamic = "force-dynamic";

//process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

// font 파일 경로
const fontPath = path.join(process.cwd(), 'public/fonts/Recipekorea.ttf');
const fontData = fs.readFileSync(fontPath);


export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const profileName = searchParams.get('profileName');
  const fid = searchParams.get('fid');
  const profileImage = searchParams.get('profileImage') || `${NEXT_PUBLIC_URL}/default-image.png`;

  const farScore = searchParams.get('farScore') ?? "";
  const farBoost = searchParams.get('farBoost') ?? "";
  const farRank = searchParams.get('farRank') ?? "";
  const finalFarScore = parseFloat(farScore).toLocaleString();
  const finalFarBoost = parseFloat(farBoost).toLocaleString();
  const finalFarRank = parseFloat(farRank).toLocaleString();

  const todayAmount = searchParams.get('todayAmount') ?? "";
  const weeklyAmount = searchParams.get('weeklyAmount') ?? "";
  const lifeTimeAmount = searchParams.get('lifeTimeAmount') ?? "";
  const finalTodayAmount = parseFloat(todayAmount).toLocaleString();
  const finalWeeklyAmount = parseFloat(weeklyAmount).toLocaleString();
  const finalLifeTimeAmount = parseFloat(lifeTimeAmount).toLocaleString();


  console.warn("profileName=" + profileName);
  console.warn("fid=" + fid);


  let like  = 0;
  let reply = 0;
  let rcQt  = 0;
  let finalLike = 'N/A';
  let finalReply = 'N/A';
  let finalRcQt = 'N/A';

  let likeUsd  = 0;
  let replyUsd = 0;
  let rcQtUsd  = 0;
  let finalLikeUsd  = 'N/A';
  let finalReplyUsd = 'N/A';
  let finalRcQtUsd  = 'N/A';

  let likeKrw  = 0;
  let replyKrw = 0;
  let rcQtKrw  = 0;
  let finalLikeKrw  = 'N/A';
  let finalReplyKrw = 'N/A';
  let finalRcQtKrw  = 'N/A';

  let todayAmountUsd    = 0;
  let weeklyAmountUsd   = 0;
  let lifeTimeAmountUsd = 0;
  let finalTodayAmountUsd    = 'N/A';
  let finalWeeklyAmountUsd   = 'N/A';
  let finalLifeTimeAmountUsd = 'N/A';

  let todayAmountKrw    = 0;
  let weeklyAmountKrw   = 0;
  let lifeTimeAmountKrw = 0;
  let finalTodayAmountKrw    = 'N/A';
  let finalWeeklyAmountKrw   = 'N/A';
  let finalLifeTimeAmountKrw = 'N/A';

  let moxieUsdPrice = 'N/A';
  let moxieKrwPrice = 'N/A';

  try {
    const { moxieUsdPrice: usdPrice, moxieKrwPrice: krwPrice } = await fetchCoinData();
    moxieUsdPrice = parseFloat(usdPrice).toLocaleString('en-US', { minimumFractionDigits: 5 });
    moxieKrwPrice = parseFloat(krwPrice).toLocaleString('ko-KR');

    console.warn("moxieUsdPrice=" + moxieUsdPrice);
    console.warn("moxieKrwPrice=" + moxieKrwPrice);

    //화면 구성값 계산
    like  = parseFloat(farScore) * 1;
    reply = parseFloat((parseFloat(farScore) * 3).toFixed(3));
    rcQt  = parseFloat((parseFloat(farScore) * 6).toFixed(3));
    finalLike  = like.toLocaleString();
    finalReply = reply.toLocaleString();
    finalRcQt  = rcQt.toLocaleString();

     console.warn("finalLike=" + finalLike);
     console.warn("finalReply=" + finalReply);
     console.warn("finalRcQt=" + finalRcQt);

    likeUsd  = parseFloat((like * parseFloat(moxieUsdPrice)).toFixed(4)); //finalLikeUsd 시 0이 나와서 임시 likeUsd로 화면에 보여줌
    replyUsd = parseFloat((reply * parseFloat(moxieUsdPrice)).toFixed(4));
    rcQtUsd  = parseFloat((rcQt * parseFloat(moxieUsdPrice)).toFixed(4));
    finalLikeUsd  = likeUsd.toLocaleString();
    finalReplyUsd = replyUsd.toLocaleString();
    finalRcQtUsd  = rcQtUsd.toLocaleString();


    likeKrw  = parseFloat((like * parseFloat(moxieKrwPrice)).toFixed(2));
    replyKrw = parseFloat((reply * parseFloat(moxieKrwPrice)).toFixed(2));
    rcQtKrw  = parseFloat((rcQt * parseFloat(moxieKrwPrice)).toFixed(2));
    finalLikeKrw = likeKrw.toLocaleString();
    finalReplyKrw = replyKrw.toLocaleString();
    finalRcQtKrw = rcQtKrw.toLocaleString();

    todayAmountUsd    = parseFloat((parseFloat(todayAmount) * parseFloat(moxieUsdPrice)).toFixed(2).toLocaleString());
    weeklyAmountUsd   = parseFloat((parseFloat(weeklyAmount) * parseFloat(moxieUsdPrice)).toFixed(2).toLocaleString());
    lifeTimeAmountUsd = parseFloat((parseFloat(lifeTimeAmount) * parseFloat(moxieUsdPrice)).toFixed(2).toLocaleString());
    finalTodayAmountUsd = todayAmountUsd.toLocaleString();
    finalWeeklyAmountUsd = weeklyAmountUsd.toLocaleString();
    finalLifeTimeAmountUsd = lifeTimeAmountUsd.toLocaleString();

    todayAmountKrw    = parseFloat((parseFloat(todayAmount) * parseFloat(moxieKrwPrice)).toFixed(2).toLocaleString());
    weeklyAmountKrw   = parseFloat((parseFloat(weeklyAmount) * parseFloat(moxieKrwPrice)).toFixed(2).toLocaleString());
    lifeTimeAmountKrw = parseFloat((parseFloat(lifeTimeAmount) * parseFloat(moxieKrwPrice)).toFixed(2).toLocaleString());
    finalTodayAmountKrw = todayAmountKrw.toLocaleString();
    finalWeeklyAmountKrw = weeklyAmountKrw.toLocaleString();
    finalLifeTimeAmountKrw = lifeTimeAmountKrw.toLocaleString();

  } catch (error) {
    console.error('Error fetching MOXIE price:', error);
  }

  if (searchParams != null) {
    return new ImageResponse(
      (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          alignItems: 'center',
          height: '100%',
          width: '100%',
          //fontFamily: '"Arial", sans-serif',
          fontFamily: '"Poppins-Regular"', // 폰트 이름
          //backgroundColor: '#7158e2',
          color: '#B203B2',
          padding: '40px',
          boxSizing: 'border-box',
          //backgroundImage: 'linear-gradient(145deg, #6d5dfc 10%, #b2a3f6 90%)',
          backgroundImage: `url(${NEXT_PUBLIC_URL}/bg_moxie.png)`,
        }}
      >


        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%', fontSize: '80px', marginBottom: '50px' }}>
          <div style={{ display: 'flex', textAlign: 'left' }}>
          <img
            src={profileImage}
            height="150"
            width="150"
            style={{
              borderRadius: '0%',
              objectFit: 'cover',
              marginRight: '20px',
            }}
          />
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', fontSize: '30px', color: 'black', marginTop: '20px' }}>
            <div style={{ display: 'flex', marginRight: '20px' }}>@{profileName}</div>
            <div style={{ display: 'flex', marginRight: '40px' }}>FID:{fid}</div>
          </div>

          </div>
          <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'right', fontSize: '80px' }}>
            <strong></strong>
            <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'right', fontSize: '40px' }}>
              <strong style={{ marginLeft: '150px', fontSize: '30px'}}>Moxie Price</strong>
              <strong style={{ marginLeft: '150px'}}>0.0209 USD</strong>
              <strong style={{ marginLeft: '150px'}}>2.78 KRW</strong>
            </div>
          </div>
        </div>


        {/* 행 단위로 구성된 섹션들 */}
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%', fontSize: '40px' }}>
          <div style={{ display: 'flex', textAlign: 'left' }}>
            <strong>FarRank</strong>
          </div>
          <div style={{ display: 'flex', textAlign: 'right' }}>
            <strong>FarScore</strong>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%', fontSize: '70px' }}>
          <div style={{ display: 'flex', textAlign: 'left' }}>
            <strong>805</strong>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'right', fontSize: '70px' }}>
            <strong>3.47</strong>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%', fontSize: '70px', marginBottom: '10px' }}>
          <div style={{ display: 'flex', textAlign: 'left' }}>
            <strong></strong>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'right', fontSize: '70px' }}>
            <strong></strong>
            <div style={{ display: 'flex', flexDirection: 'row', textAlign: 'right', fontSize: '30px' }}>
              <strong>(3.40 FT / 0 LP)</strong>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%', fontSize: '50px', marginBottom: '50px' }}>
          <div style={{ display: 'flex', textAlign: 'left' }}>
            <strong></strong>
          </div>
          <div style={{ display: 'flex', textAlign: 'right' }}>
            <strong></strong>
          </div>
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%', fontSize: '30px', marginBottom: '10px' }}>
          <div style={{ display: 'flex', textAlign: 'left' }}>
            <strong></strong>
          </div>
          <div style={{ display: 'flex', textAlign: 'right' }}>
            <strong>USD / KRW</strong>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%', fontSize: '45px', marginBottom: '25px' }}>
          <div style={{ display: 'flex', textAlign: 'left', fontSize: '40px' }}>
            <strong>ClaimAmount 4736.75</strong>
          </div>
          <div style={{ display: 'flex', textAlign: 'right' }}>
            <strong>15.26 / 20,302</strong>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%', fontSize: '45px', marginBottom: '25px' }}>
          <div style={{ display: 'flex', textAlign: 'left' }}>
            <strong>TVL 340.5K</strong>
          </div>
          <div style={{ display: 'flex', textAlign: 'right', fontSize: '40px' }}>
            <strong>710.12 / 945,200</strong>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%', fontSize: '45px', marginBottom: '25px' }}>
          <div style={{ display: 'flex', textAlign: 'left' }}>
            <strong>Today 6,781.25</strong>
          </div>
          <div style={{ display: 'flex', textAlign: 'right' }}>
            <strong>15.26 / 20,302</strong>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%', fontSize: '50px' }}>
          <div style={{ display: 'flex', flexDirection: 'row',textAlign: 'left', marginLeft: '5px' }}>
            <img
              src={`${NEXT_PUBLIC_URL}/like.png`}
              height="100"
              width="100"
              style={{
                borderRadius: '0%',
                objectFit: 'cover',
                marginRight: '20px',
              }}
            />
            <strong style={{marginTop: '15px' }}>3.47</strong>
            <strong style={{marginTop: '15px', marginLeft: '20px' }}>[ ∞ ]</strong>
          </div>
          <div style={{ display: 'flex', textAlign: 'right', fontSize: '60px' }}>
            <strong>0.0073 / 9</strong>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%', fontSize: '50px' }}>
          <div style={{ display: 'flex', flexDirection: 'row',textAlign: 'left' }}>
            <img
              src={`${NEXT_PUBLIC_URL}/word_bubble.png`}
              height="110"
              width="110"
              style={{
                borderRadius: '0%',
                objectFit: 'cover',
                marginRight: '20px',
              }}
            />
            <strong style={{marginTop: '20px' }}>10.42</strong>
            <strong style={{marginTop: '20px', marginLeft: '20px' }}>[132/150]</strong>
          </div>
          <div style={{ display: 'flex', textAlign: 'right', fontSize: '60px' }}>
            <strong>0.022 / 28</strong>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%', fontSize: '50px' }}>
          <div style={{ display: 'flex', flexDirection: 'row',textAlign: 'left' }}>
            <img
              src={`${NEXT_PUBLIC_URL}/recast.png`}
              height="110"
              width="110"
              style={{
                borderRadius: '0%',
                objectFit: 'cover',
                marginRight: '20px',
              }}
            />
            <strong style={{marginTop: '20px' }}>20.85</strong>
            <strong style={{marginTop: '20px', marginLeft: '20px' }}>[95/150]</strong>
          </div>
          <div style={{ display: 'flex', textAlign: 'right', fontSize: '60px' }}>
            <strong>0.044 / 57</strong>
          </div>
        </div>


        <div
          style={{
            position: 'absolute',
            bottom: '20px',
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
            padding: '0 20px', // Padding for left and right alignment
            fontSize: '24px', // Adjust font size as needed
            color: 'black',
            fontFamily: '"Poppins-Regular"', // 폰트 이름
          }}
        >
          {/* 시간 (ISO 8601 포맷) */}
          <span>{new Date().toISOString()}</span>

          {/* 작성자 */}
          <span>by @hemanruru</span>
        </div>

        </div>
      ),
      {
        width: 1200,
        height: 1200,
        fonts: [
          {
            name: 'Poppins-Regular',
            data: fontData,
            weight: 400,
            style: 'normal',
          },
        ],
      }
    );
    
  } else {
    return new ImageResponse(
      (
        <div
          style={{
            fontSize: 40,
            color: "black",
            background: "white",
            width: "100%",
            height: "100%",
            padding: "50px 200px",
            textAlign: "center",
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
          }}
        >
          Error fetching data :(. Please try again later.
        </div>
      ),
      {
        width: 1200,
        height: 1200,
        fonts: [
          {
            name: 'Poppins-Regular',
            data: fontData,
            weight: 400,
            style: 'normal',
          },
        ],
      }
    );
  }
}
