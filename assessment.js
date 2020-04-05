"use strict"
const userNameInput=document.getElementById("user-name");
const assessmentButton=document.getElementById("assessment");
const resultDivided=document.getElementById("result-area");
const tweetDivided=document.getElementById("tweet-area");
/**
 * 指定した要素の子どもを全て削除する
 * @param{HTMLElement} element HTMLの要素
 */
function removeAllChildren(element){
    while(element.firstChild){
        element.removeChild(element.firstChild);
    }
}
assessmentButton.onclick=()=>{
    const userName=userNameInput.value;
    if(userName.length===0){
        return;
    }
userNameInput.onkeydown = (event) => {
    if (event.key ==='Enter'){
        assessmentButton.onclick();
    }
  };
    //to do 診断結果表示エリアの作成
    removeAllChildren(resultDivided);
    const header=document.createElement("h3");//<h3></h3>を作成
    header.innerText="診断結果";
    resultDivided.appendChild(header);//div要素の中にheader(h3タグ)を追加

    const paragraph=document.createElement("p");
    const result=assessment(userName);
    paragraph.innerText=result;
    resultDivided.appendChild(paragraph);

    //to do ツイートエリアの作成
    removeAllChildren(tweetDivided);
    const anchor=document.createElement("a");
    const hrefValue="https://twitter.com/intent/tweet?button_hashtag="+encodeURIComponent("あなたのいいところ")+"&ref_src=tws5Etfwrc";

    anchor.setAttribute("href",hrefValue);
    anchor.className="twitter-hashtag-button";
    anchor.setAttribute("data-text",result);//診断結果の変数resultをdata-text属性に入れる
    anchor.innerText="Tweet #あなたのいいところ";
    tweetDivided.appendChild(anchor);

    //widgets.js(twitterボタンの見た目)の設定
    const script = document.createElement('script');
    script.setAttribute('src', 'https://platform.twitter.com/widgets.js');
    tweetDivided.appendChild(script);
};
const answers=[
    "{userName}のいいところは声です。{userName}の特徴的な声は皆を惹きつけ、心に残ります。",
    "{userName}のいいところはまなざしです。{userName}に見つめられた人は、気になって仕方がないでしょう。",
    "{userName}のいいところは情熱です。{userName}の情熱に周りの人は感化されます。",
    "{userName}のいいところは厳しさです。{userName}の厳しさがものごとをいつも成功に導きます。",
    "{userName}のいいところは知識です。博識な{userName}を多くの人が頼りにしています。",
    "{userName}のいいところはユニークさです。{userName}だけのその特徴が皆を楽しくさせます。",
    "{userName}のいいところは用心深さです。{userName}の洞察に、多くの人が助けられます。",
    "{userName}のいいところは見た目です。内側から溢れ出る{userName}の良さに皆が気を惹かれます。",
    "{userName}のいいところは決断力です。{userName}がする決断にいつも助けられる人がいます。",
    "{userName}のいいところは思いやりです。{userName}に気をかけてもらった多くの人が感謝しています。",
    "{userName}のいいところは感受性です。{userName}が感じたことに皆が共感し、わかりあうことができます。",
    "{userName}のいいところは節度です。強引すぎない{userName}の考えに皆が感謝しています。",
    "{userName}のいいところは好奇心です。新しいことに向かっていく{userName}の心構えが多くの人に魅力的に映ります。",
    "{userName}のいいところは気配りです。{userName}の配慮が多くの人を救っています。",
    "{userName}のいいところはその全てです。ありのままの{userName}自身がいいところなのです。",
    "{userName}のいいところは自制心です。やばいと思ったときにしっかりと衝動を抑えられる{userName}が皆から評価されています。",
    "{userName}のいいところは優しさです。{userName}の優しい振る舞いに多くの人が癒されています。"
];
/**
*名前の文字列を渡すと診断結果を返す関数
*@param{string} userName ユーザーの名前
*@return{string}診断結果
*/
function assessment(userName){
    //文字コードを取得して足し合わせる
    let sum0fCharcode=0;
    for(let i=0;i<userName.length;i++){
        sum0fCharcode=sum0fCharcode+userName.charCodeAt(i);
    }
    const index=sum0fCharcode%answers.length;
    let result=answers[index];
    result=result.replace(/\{userName}/g,userName);
    return result;
}
//console.log(assessment("太郎"))
console.assert(
    assessment("太郎")===assessment("太郎"),
    "入力した名前と診断した名前が異なります。"
);
console.assert(
    assessment("太郎")===assessment("次郎"),
    "入力した名前と診断した名前が異なります。"
);
