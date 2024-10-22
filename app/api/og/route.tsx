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
  //const farBoost = searchParams.get('farBoost') ?? "";
  const farRank = searchParams.get('farRank') ?? "";
  const finalFarScore = parseFloat(farScore).toFixed(2).toLocaleString();
  //const finalFarBoost = parseFloat(farBoost).toLocaleString();
  const finalFarRank = parseFloat(farRank).toLocaleString();

  const tvl = searchParams.get('tvl') ?? "";
  const tvlBoost = searchParams.get('tvlBoost') ?? "";
  const liquidityBoost = searchParams.get('liquidityBoost') ?? "";
  const powerBoost = searchParams.get('powerBoost') ?? "";
  const availableClaimAmount = searchParams.get('availableClaimAmount') ?? "";
  //const finalTvl = parseFloat(tvl).toLocaleString();
  const finalTvlBoost = parseFloat(tvlBoost).toLocaleString();
  const finalLiquidityBoost = parseFloat(liquidityBoost).toLocaleString();
  const finalPowerBoost = parseFloat(powerBoost).toLocaleString();
  const finalAvailableClaimAmount = parseFloat(availableClaimAmount).toLocaleString();

  const stakedTvl = searchParams.get('stakedTvl') ?? "";
  //const finalStakedTvl = parseFloat(stakedTvl).toLocaleString();
  const unStakedTvl = searchParams.get('unStakedTvl') ?? "";
  //const finalUnStakedTvl = parseFloat(unStakedTvl).toLocaleString();

  const todayAmount = searchParams.get('todayAmount') ?? "";
  const finalTodayAmount = parseFloat(todayAmount).toLocaleString();

  const replyCount = searchParams.get('replyCount') ?? "";
  const likeCount = searchParams.get('likeCount') ?? "";
  const recastCount = searchParams.get('recastCount') ?? "";
  const quoteCount = searchParams.get('quoteCount') ?? "";

  const allowLike = searchParams.get('allowLike') ?? "";
  const allowReply = searchParams.get('allowReply') ?? "";
  const allowRcQt = (searchParams.get('allowRcQt') ?? "").replace(/\s+/g, '');

  console.log("@@@allowLike=" + allowLike);
  console.log("@@@allowReply=" + allowReply);
  console.log("@@@allowRcQt=" + allowRcQt);
  // console.warn("profileName=" + profileName);
  // console.warn("fid=" + fid);


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

  let tvlUsd = 0;
  let availableClaimAmountUsd = 0;
  let finalTvl = 'N/A';
  let finalTvlUsd = 'N/A';
  let finalAvailableClaimAmountUsd = 'N/A';
  
  let tvlKrw = 0;
  let availableClaimAmountKrw = 0;
  let finalTvlKrw = 'N/A';
  let finalAvailableClaimAmountKrw = 'N/A';
  
  let finalStakedTvl = 'N/A'
  let finalUnStakedTvl = 'N/A'

  let stakedTvlUsd = 0;
  let unStakedTvlUsd = 0;
  let finalStakedTvlUsd = 'N/A';
  let finalUnStakedTvlUsd = 'N/A';

  let stakedTvlKrw = 0;
  let unStakedTvlKrw = 0;
  let finalStakedTvlKrw = 'N/A';
  let finalUnStakedTvlKrw = 'N/A';


  let todayAmountUsd    = 0;
  let finalTodayAmountUsd    = 'N/A';

  let todayAmountKrw    = 0;
  let finalTodayAmountKrw    = 'N/A';

  let finalReplyCount = 0;
  let finalLikeCount = 0;
  let finalRcQtCount = 0;

  let moxieUsdPrice = 'N/A';
  let moxieKrwPrice = 'N/A';

  try {
    const { moxieUsdPrice: usdPrice, moxieKrwPrice: krwPrice } = await fetchCoinData();
    moxieUsdPrice = parseFloat(usdPrice).toLocaleString('en-US', { minimumFractionDigits: 5 });
    moxieKrwPrice = parseFloat(krwPrice).toLocaleString('ko-KR');

    console.warn("moxieUsdPrice=" + moxieUsdPrice);
    console.warn("moxieKrwPrice=" + moxieKrwPrice);

    //화면 구성값 계산
    like  = parseFloat(farScore) * 0.5;
    reply = parseFloat((parseFloat(farScore) * 1).toFixed(3));
    rcQt  = parseFloat((parseFloat(farScore) * 2).toFixed(3));
    finalLike  = like.toLocaleString();
    finalReply = reply.toLocaleString();
    finalRcQt  = rcQt.toLocaleString();

     console.warn("finalLike=" + finalLike);
     console.warn("finalReply=" + finalReply);
     console.warn("finalRcQt=" + finalRcQt);

    /* like,reply,rcqt 관련 USD */
    likeUsd  = parseFloat((like * parseFloat(moxieUsdPrice)).toFixed(4)); //finalLikeUsd 시 0이 나와서 임시 likeUsd로 화면에 보여줌
    replyUsd = parseFloat((reply * parseFloat(moxieUsdPrice)).toFixed(4));
    rcQtUsd  = parseFloat((rcQt * parseFloat(moxieUsdPrice)).toFixed(4));
    finalLikeUsd  = likeUsd.toLocaleString();
    finalReplyUsd = replyUsd.toLocaleString();
    finalRcQtUsd  = rcQtUsd.toLocaleString();

    /* like,reply,rcqt 관련 KRW */
    likeKrw  = parseFloat((like * parseFloat(moxieKrwPrice)).toFixed(0));
    replyKrw = parseFloat((reply * parseFloat(moxieKrwPrice)).toFixed(0));
    rcQtKrw  = parseFloat((rcQt * parseFloat(moxieKrwPrice)).toFixed(0));
    finalLikeKrw = likeKrw.toLocaleString();
    finalReplyKrw = replyKrw.toLocaleString();
    finalRcQtKrw = rcQtKrw.toLocaleString();

    /* tvl 관련 USD */
    tvlUsd    = parseFloat((parseFloat(tvl) * parseFloat(moxieUsdPrice)).toFixed(2));
    availableClaimAmountUsd    = parseFloat((parseFloat(availableClaimAmount) * parseFloat(moxieUsdPrice)).toFixed(2));
    finalTvlUsd = tvlUsd.toLocaleString();
    finalAvailableClaimAmountUsd = availableClaimAmountUsd.toLocaleString();

    /* tvl 관련 KRW */
    tvlKrw    = parseFloat((parseFloat(tvl) * parseFloat(moxieKrwPrice)).toFixed(0));
    availableClaimAmountKrw    = parseFloat((parseFloat(availableClaimAmount) * parseFloat(moxieKrwPrice)).toFixed(0));
    finalTvlKrw = tvlKrw.toLocaleString();
    finalAvailableClaimAmountKrw = availableClaimAmountKrw.toLocaleString();

    finalTvl = (Number(tvl) / 1e3).toFixed(1);



    /* stakedTvl, unStakedTvl 관련 USD */
    stakedTvlUsd    = parseFloat((parseFloat(stakedTvl) * parseFloat(moxieUsdPrice)).toFixed(2));
    unStakedTvlUsd    = parseFloat((parseFloat(unStakedTvl) * parseFloat(moxieUsdPrice)).toFixed(2));
    finalStakedTvlUsd = stakedTvlUsd.toLocaleString();
    finalUnStakedTvlUsd = unStakedTvlUsd.toLocaleString();

    /* stakedTvl, unStakedTvl 관련 KRW */
    stakedTvlKrw    = parseFloat((parseFloat(stakedTvl) * parseFloat(moxieKrwPrice)).toFixed(0));
    unStakedTvlKrw    = parseFloat((parseFloat(unStakedTvl) * parseFloat(moxieKrwPrice)).toFixed(0));
    finalStakedTvlKrw = stakedTvlKrw.toLocaleString();
    finalUnStakedTvlKrw = unStakedTvlKrw.toLocaleString();
    
    finalStakedTvl = Number((Number(stakedTvl) / 1e3).toFixed(1)).toLocaleString();
    finalUnStakedTvl = Number((Number(unStakedTvl) / 1e3).toFixed(1)).toLocaleString();

    /* today,weekly,lifeTime 관련 USD */
    todayAmountUsd    = parseFloat((parseFloat(todayAmount) * parseFloat(moxieUsdPrice)).toFixed(2).toLocaleString());
    finalTodayAmountUsd = todayAmountUsd.toLocaleString();
    
    /* today,weekly,lifeTime 관련 KRW */
    todayAmountKrw    = parseFloat((parseFloat(todayAmount) * parseFloat(moxieKrwPrice)).toFixed(0).toLocaleString());
    finalTodayAmountKrw = todayAmountKrw.toLocaleString();

    /* 댓글, 좋아요, 리캐 및 인용 개수 */
    finalReplyCount = parseFloat(replyCount);
    finalLikeCount = parseFloat(likeCount);
    finalRcQtCount = parseFloat(recastCount) + parseFloat(quoteCount);

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
          color: '#FFFFFF',
          padding: '40px',
          boxSizing: 'border-box',
          //backgroundImage: 'linear-gradient(145deg, #6d5dfc 10%, #b2a3f6 90%)',
          backgroundImage: `url(${NEXT_PUBLIC_URL}/autumn.png)`,
        }}
      >


        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%', fontSize: '80px', marginBottom: '35px' }}>
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
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', fontSize: '30px', color: 'black', marginTop: '20px' }}>
            <div style={{ display: 'flex', marginRight: '20px' }}>@{profileName}</div>
            <div style={{ display: 'flex', marginRight: '40px' }}>FID:{fid}</div>
          </div>

          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <strong></strong>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems:'flex-end', fontSize: '30px' }}>
              <strong style={{ marginLeft: '150px', fontSize: '25px' }}>Moxie Price</strong>
              <strong style={{ marginLeft: '150px' }}>{moxieUsdPrice} USD</strong>
              <strong style={{ marginLeft: '150px' }}>{moxieKrwPrice} KRW</strong>
            </div>
          </div>
        </div>


        {/* 행 단위로 구성된 섹션들 */}
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%', fontSize: '25px' }}>
          <div style={{ display: 'flex', textAlign: 'left' }}>
            <strong>FarRank</strong>
          </div>
          <div style={{ display: 'flex', textAlign: 'right' }}>
            <strong>FarScore</strong>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%', fontSize: '70px' }}>
          <div style={{ display: 'flex', textAlign: 'left' }}>
            <strong>{finalFarRank}</strong>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'right', fontSize: '70px' }}>
            <strong>{finalFarScore}</strong>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%', fontSize: '70px', marginBottom: '10px' }}>
          <div style={{ display: 'flex', textAlign: 'left' }}>
            <strong></strong>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'right', fontSize: '70px' }}>
            <strong></strong>
            <div style={{ display: 'flex', flexDirection: 'row', textAlign: 'right', fontSize: '30px' }}>
              <strong>({finalTvlBoost} FT / {finalPowerBoost} MP / {finalLiquidityBoost} LP)</strong>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%', fontSize: '50px', marginBottom: '35px' }}>
          <div style={{ display: 'flex', textAlign: 'left' }}>
            <strong></strong>
          </div>
          <div style={{ display: 'flex', textAlign: 'right' }}>
            <strong></strong>
          </div>
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%', fontSize: '25px', marginBottom: '10px' }}>
          <div style={{ display: 'flex', textAlign: 'left' }}>
            <strong></strong>
          </div>
          <div style={{ display: 'flex', textAlign: 'right' }}>
            <strong>USD / KRW</strong>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%', fontSize: '45px', marginBottom: '25px' }}>
          <div style={{ display: 'flex', textAlign: 'left', fontSize: '40px' }}>
            <strong>AvailableClaim {finalAvailableClaimAmount}</strong>
          </div>
          <div style={{ display: 'flex', textAlign: 'right' }}>
            <strong>{finalAvailableClaimAmountUsd} / {finalAvailableClaimAmountKrw}</strong>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%', fontSize: '45px', marginBottom: '25px' }}>
          <div style={{ display: 'flex', textAlign: 'left', fontSize: '40px' }}>
            <strong>Locked {finalStakedTvl}K</strong>
          </div>
          <div style={{ display: 'flex', textAlign: 'right' }}>
            <strong>{finalStakedTvlUsd} / {finalStakedTvlKrw}</strong>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%', fontSize: '45px', marginBottom: '25px' }}>
          <div style={{ display: 'flex', textAlign: 'left', fontSize: '40px' }}>
            <strong>UnLocked {finalUnStakedTvl}K</strong>
          </div>
          <div style={{ display: 'flex', textAlign: 'right' }}>
            <strong>{finalUnStakedTvlUsd} / {finalUnStakedTvlKrw}</strong>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%', fontSize: '45px', marginBottom: '25px' }}>
          <div style={{ display: 'flex', textAlign: 'left' }}>
            <strong>Today {finalTodayAmount}</strong>
          </div>
          <div style={{ display: 'flex', textAlign: 'right' }}>
            <strong>{finalTodayAmountUsd} / {finalTodayAmountKrw}</strong>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%', fontSize: '50px' }}>
          <div style={{ display: 'flex', flexDirection: 'row',textAlign: 'left', marginBottom:'8px' }}>
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
            <strong style={{marginTop: '15px' }}>{like.toFixed(2)}</strong>
            <strong style={{marginTop: '15px', marginLeft: '20px' }}>[{finalLikeCount}/{allowLike}]</strong>
          </div>
          <div style={{ display: 'flex', textAlign: 'right', fontSize: '60px' }}>
            <strong>{finalLikeUsd} / {finalLikeKrw}</strong>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%', fontSize: '50px' }}>
          <div style={{ display: 'flex', flexDirection: 'row',textAlign: 'left', marginBottom:'8px' }}>
            <img
              src={`${NEXT_PUBLIC_URL}/word_bubble.png`}
              height="100"
              width="100"
              style={{
                borderRadius: '0%',
                objectFit: 'cover',
                marginRight: '20px',
              }}
            />
            <strong style={{marginTop: '20px' }}>{reply.toFixed(2)}</strong>
            <strong style={{marginTop: '20px', marginLeft: '20px' }}>[{finalReplyCount}/{allowReply}]</strong>
          </div>
          <div style={{ display: 'flex', textAlign: 'right', fontSize: '60px', marginTop:'10px' }}>
            <strong>{finalReplyUsd} / {finalReplyKrw}</strong>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%', fontSize: '50px' }}>
          <div style={{ display: 'flex', flexDirection: 'row',textAlign: 'left' }}>
            <img
              src={`${NEXT_PUBLIC_URL}/recast.png`}
              height="115"
              width="110"
              style={{
                borderRadius: '0%',
                objectFit: 'cover',
                marginRight: '20px',
              }}
            />
            <strong style={{marginTop: '20px' }}>{rcQt.toFixed(2)}</strong>
            <strong style={{marginTop: '20px', marginLeft: '20px' }}>[{finalRcQtCount}/{allowRcQt}]</strong>
          </div>
          <div style={{ display: 'flex', textAlign: 'right', fontSize: '60px', marginTop:'10px' }}>
            <strong>{finalRcQtUsd} / {finalRcQtKrw}</strong>
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
