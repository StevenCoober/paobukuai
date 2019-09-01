var RunFastConfig = module.exports;
RunFastConfig.RUNFAST_GAME_PLAYER_MAX = 3;
RunFastConfig.RUNFAST_MAX_CARD = 48;
RunFastConfig.RUNFAST_PLAYER_MAX_CARD = 16;

RunFastConfig.GameState = 
{
	FREE_STATE:0,
	GAMING_STATE:1
}

RunFastConfig.COMPARE_INVALIDE = -1;
RunFastConfig.COMPARE_LEFT_BIG = 0;
RunFastConfig.COMPARE_RIGHT_BIG = 1;


RunFastConfig.INVALID_NUM = -1;
//牌型
RunFastConfig.RUNFAST_INVALIDE = -1;
RunFastConfig.RUNFAST_SINGLE = 0;               /*单张*/
RunFastConfig.RUNFAST_DOUBLE = 1;               /*对*/
RunFastConfig.RUNFAST_SINGLE_LINE = 2;          /*顺子，五张或五张以上牌点连续的牌*/
RunFastConfig.RUNFAST_DOUBLE_LINE = 3;          /*连对，两对或两对以上相连的牌*/
RunFastConfig.RUNFAST_THREE_LINE  = 4;			/*连三张*/
RunFastConfig.RUNFAST_THREE = 5;                /*三张*/
RunFastConfig.RUNFAST_THREE_ADD_ONE = 6;        /*三带一*/
RunFastConfig.RUNFAST_THREE_ADD_TWO = 7;        /*三带二*/

RunFastConfig.RUNFAST_BOMB = 8;                 /*炸弹，四张或四张以上牌点相同的牌*/
RunFastConfig.RUNFAST_THREE_ADD_TWO_BELOW = 9;	/*六带三*/

RunFastConfig.PROMPT_CARD_ALL = -1;

RunFastConfig.ONLYONE_CARD_INVALIDE = -1;

RunFastConfig.BureauConsume = 
{
	[4]: 1,
	[8]: 2
}

RunFastConfig.SoundType = 
{
	SOUND_TYPE_RUNFAST_INVALIDE:-1,
	/*男*/
	SOUND_TYPE_MAN_RUNFAST_INVALIDE:-1,
	SOUND_TYPE_MAN_RUNFAST_SINGLE:0,                     /*单张*/
	SOUND_TYPE_MAN_RUNFAST_DOUBLE:1,                     /*对*/
	SOUND_TYPE_MAN_RUNFAST_SINGLE_LINE:2,                /*顺子，五张或五张以上牌点连续的牌*/
	SOUND_TYPE_MAN_RUNFAST_DOUBLE_LINE:3,                /*连对，两对或两对以上相连的牌*/
	SOUND_TYPE_MAN_RUNFAST_THREE:4,                      /*三张*/
	// SOUND_TYPE_MAN_RUNFAST_THREE_ADD_ONE:5,           /*三带一*/
	// SOUND_TYPE_MAN_RUNFAST_THREE_ADD_TWO:6,           /*三带二*/
	SOUND_TYPE_MAN_RUNFAST_BOMB:7,                       /*炸弹，四张或四张以上牌点相同的牌*/
	SOUND_TYPE_MAN_RUNFAST_PASS:8,					     /*过*/

	// ＋＋＋＋＋＋＋＋＋＋＋＋不 流 泪 的 机 场＋＋＋＋＋＋＋＋＋＋＋＋ 


	// 爱是    三万里程的孤单 

	// 闪着等待的泪光 眺望可能的远方 

	// 爱是 再远都在你身旁 

	// 心疼了解的目光 不流泪的机场 

	// ＃。。。＃。。。＃。。。＃。。。＃。。。＃。。。＃。。。＃ 
	
	/*女*/
	SOUND_TYPE_WOMAN_RUNFAST_SINGLE:9,                   /*单张*/
	SOUND_TYPE_WOMAN_RUNFAST_DOUBLE:10,                  /*对*/
	SOUND_TYPE_WOMAN_RUNFAST_SINGLE_LINE:11,             /*顺子，五张或五张以上牌点连续的牌*/
	SOUND_TYPE_WOMAN_RUNFAST_DOUBLE_LINE:12,             /*连对，两对或两对以上相连的牌*/
	SOUND_TYPE_WOMAN_RUNFAST_THREE:13,                   /*三张*/
	// SOUND_TYPE_WOMAN_RUNFAST_THREE_ADD_ONE:14,        /*三带一*/
	// SOUND_TYPE_WOMAN_RUNFAST_THREE_ADD_TWO:15,        /*三带二*/
	SOUND_TYPE_WOMAN_RUNFAST_BOMB:16,                    /*炸弹，四张或四张以上牌点相同的牌*/
	SOUND_TYPE_WOMAN_RUNFAST_PASS:17,			         /*过*/
}

RunFastConfig.Sound = 
{
  [RunFastConfig.SoundType.SOUND_TYPE_MAN_RUNFAST_BOMB]:"nan/boom",               		//炸弹

  [RunFastConfig.SoundType.SOUND_TYPE_MAN_RUNFAST_DOUBLE_LINE]:"nan/b_manytwo", 		//连对

  [RunFastConfig.SoundType.SOUND_TYPE_MAN_RUNFAST_SINGLE_LINE]:"nan/b_straight",         //顺子

  [RunFastConfig.SoundType.SOUND_TYPE_MAN_RUNFAST_THREE]:
  [
		"nan/b_3add2",            //三带二
		"nan/b_plane",            //飞机
  ],

  [RunFastConfig.SoundType.SOUND_TYPE_MAN_RUNFAST_DOUBLE]:
  [
		"nan/Double/b_pairOf1",   //对3
		"nan/Double/b_pairOf2",   //对4
		"nan/Double/b_pairOf3",   //对5
		"nan/Double/b_pairOf4",   //对6
		"nan/Double/b_pairOf5",   //对7
		"nan/Double/b_pairOf6",   //对8
		"nan/Double/b_pairOf7",   //对9
		"nan/Double/b_pairOf8",   //对10
		"nan/Double/b_pairOf9",   //对11
		"nan/Double/b_pairOf10",  //对12
		"nan/Double/b_pairOf11",  //对13
		"nan/Double/b_pairOf12",  //对A
		"nan/Double/b_pairOf13",  //对1
  ],
 
  [RunFastConfig.SoundType.SOUND_TYPE_MAN_RUNFAST_SINGLE]:
  [
 		"nan/One/b_1",            //一张3
		"nan/One/b_2",            //一张4
		"nan/One/b_3",            //一张5
		"nan/One/b_4",            //一张6
		"nan/One/b_5",            //一张7
		"nan/One/b_6",            //一张8
		"nan/One/b_7",            //一张9
		"nan/One/b_8",            //一张10
		"nan/One/b_9",            //一张11
		"nan/One/b_10",           //一张12
		"nan/One/b_11",           //一张13
		"nan/One/b_12",           //一张A
		"nan/One/b_13",           //一张2
		"nan/One/b_14",           //
		"nan/One/b_15",           //
  ],
  
  [RunFastConfig.SoundType.SOUND_TYPE_MAN_RUNFAST_PASS]:
  [
		"nan/Pass/b_pass0",       //管不上
		"nan/Pass/b_pass1",       //不出
		"nan/Pass/b_pass2",       //不管
		"nan/Pass/b_pass3",       //过
		"nan/Pass/b_pass4",       //过了
  ],


// 〃´`)
//      ,•´ ¸,•´`)
//     (¸,•´    (¸＊♥,.〃´`)
//                         ,•´ ¸,•´`)
//                         (¸,•´    (¸＊飘过........


  [RunFastConfig.SoundType.SOUND_TYPE_WOMAN_RUNFAST_BOMB]:"nv/boom",                //炸弹
  
  [RunFastConfig.SoundType.SOUND_TYPE_WOMAN_RUNFAST_DOUBLE_LINE]:"nv/b_manytwo", 		//连对

  [RunFastConfig.SoundType.SOUND_TYPE_WOMAN_RUNFAST_SINGLE_LINE]:"nv/b_straight",          //顺子

  [RunFastConfig.SoundType.SOUND_TYPE_WOWOMAN_RUNFAST_THREE]:
  [
		"nv/b_3add2",             //三带二
		"nv/b_plane",             //飞机
  ],

  [RunFastConfig.SoundType.SOUND_TYPE_WOMAN_RUNFAST_DOUBLE]:
  [	
		"nv/Double/b_pairOf1",    //对3
		"nv/Double/b_pairOf2",    //对4
		"nv/Double/b_pairOf3",    //对5
		"nv/Double/b_pairOf4",    //对6
		"nv/Double/b_pairOf5",    //对7
		"nv/Double/b_pairOf6",    //对8
		"nv/Double/b_pairOf7",    //对9
		"nv/Double/b_pairOf8",    //对10
		"nv/Double/b_pairOf9",    //对11
		"nv/Double/b_pairOf10",   //对12
		"nv/Double/b_pairOf11",   //对13
		"nv/Double/b_pairOf12",   //对A
		"nv/Double/b_pairOf13",   //对1
   ],

   [RunFastConfig.SoundType.SOUND_TYPE_WOMAN_RUNFAST_SINGLE]:
   [
		"nv/One/b_1",             //一张3
		"nv/One/b_2",             //一张4
		"nv/One/b_3",             //一张5
		"nv/One/b_4",             //一张6
		"nv/One/b_5",             //一张7
		"nv/One/b_6",             //一张8
		"nv/One/b_7",             //一张9
		"nv/One/b_8",             //一张10
		"nv/One/b_9",             //一张11
		"nv/One/b_10",            //一张12
		"nv/One/b_11",            //一张13
		"nv/One/b_12",            //一张A
		"nv/One/b_13",            //一张2
		"nv/One/b_14",            //
		"nv/One/b_15",            //
	],

	[RunFastConfig.SoundType.SOUND_TYPE_WOMAN_RUNFAST_PASS]:
    [
		"nv/Pass/b_pass0",        //管不上
		"nv/Pass/b_pass1",        //不出
		"nv/Pass/b_pass2",        //不管
		"nv/Pass/b_pass3",        //过
		"nv/Pass/b_pass4",        //过了
	]
}