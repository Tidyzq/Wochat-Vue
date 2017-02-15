const srcBase = 'http://localhost:1337/emotions/'
const emotions = [
  {
    src: srcBase + 'd_aini.png',
    value: '[aini]',
    name: 'aini'
  },
  {
    src: srcBase + 'd_aoteman.png',
    value: '[aoteman]',
    name: 'aoteman'
  },
  {
    src: srcBase + 'd_baibai.png',
    value: '[baibai]',
    name: 'baibai'
  },
  {
    src: srcBase + 'd_beishang.png',
    value: '[beishang]',
    name: 'beishang'
  },
  {
    src: srcBase + 'd_bishi.png',
    value: '[bishi]',
    name: 'bishi'
  },
  {
    src: srcBase + 'd_bizui.png',
    value: '[bizui]',
    name: 'bizui'
  },
  {
    src: srcBase + 'd_chanzui.png',
    value: '[chanzui]',
    name: 'chanzui'
  },
  {
    src: srcBase + 'd_chijing.png',
    value: '[chijing]',
    name: 'chijing'
  },
  {
    src: srcBase + 'd_dahaqi.png',
    value: '[dahaqi]',
    name: 'dahaqi'
  },
  {
    src: srcBase + 'd_dalian.png',
    value: '[dalian]',
    name: 'dalian'
  },
  {
    src: srcBase + 'd_ding.png',
    value: '[ding]',
    name: 'ding'
  },
  {
    src: srcBase + 'd_doge.png',
    value: '[doge]',
    name: 'doge'
  },
  {
    src: srcBase + 'd_feizao.png',
    value: '[feizao]',
    name: 'feizao'
  },
  {
    src: srcBase + 'd_ganmao.png',
    value: '[ganmao]',
    name: 'ganmao'
  },
  {
    src: srcBase + 'd_guzhang.png',
    value: '[guzhang]',
    name: 'guzhang'
  },
  {
    src: srcBase + 'd_haha.png',
    value: '[haha]',
    name: 'haha'
  },
  {
    src: srcBase + 'd_haixiu.png',
    value: '[haixiu]',
    name: 'haixiu'
  },
  {
    src: srcBase + 'd_han.png',
    value: '[han]',
    name: 'han'
  },
  {
    src: srcBase + 'd_hehe.png',
    value: '[hehe]',
    name: 'hehe'
  },
  {
    src: srcBase + 'd_heixian.png',
    value: '[heixian]',
    name: 'heixian'
  },
  {
    src: srcBase + 'd_heng.png',
    value: '[heng]',
    name: 'heng'
  },
  {
    src: srcBase + 'd_huaxin.png',
    value: '[huaxin]',
    name: 'huaxin'
  },
  {
    src: srcBase + 'd_jiyan.png',
    value: '[jiyan]',
    name: 'jiyan'
  },
  {
    src: srcBase + 'd_keai.png',
    value: '[keai]',
    name: 'keai'
  },
  {
    src: srcBase + 'd_kelian.png',
    value: '[kelian]',
    name: 'kelian'
  },
  {
    src: srcBase + 'd_ku.png',
    value: '[ku]',
    name: 'ku'
  },
  {
    src: srcBase + 'd_kun.png',
    value: '[kun]',
    name: 'kun'
  },
  {
    src: srcBase + 'd_landelini.png',
    value: '[landelini]',
    name: 'landelini'
  },
  {
    src: srcBase + 'd_lei.png',
    value: '[lei]',
    name: 'lei'
  },
  {
    src: srcBase + 'd_miao.png',
    value: '[miao]',
    name: 'miao'
  },
  {
    src: srcBase + 'd_nanhaier.png',
    value: '[nanhaier]',
    name: 'nanhaier'
  },
  {
    src: srcBase + 'd_nu.png',
    value: '[nu]',
    name: 'nu'
  },
  {
    src: srcBase + 'd_numa.png',
    value: '[numa]',
    name: 'numa'
  },
  {
    src: srcBase + 'd_nvhaier.png',
    value: '[nvhaier]',
    name: 'nvhaier'
  },
  {
    src: srcBase + 'd_qian.png',
    value: '[qian]',
    name: 'qian'
  },
  {
    src: srcBase + 'd_qinqin.png',
    value: '[qinqin]',
    name: 'qinqin'
  },
  {
    src: srcBase + 'd_shayan.png',
    value: '[shayan]',
    name: 'shayan'
  },
  {
    src: srcBase + 'd_shengbing.png',
    value: '[shengbing]',
    name: 'shengbing'
  },
  {
    src: srcBase + 'd_shenshou.png',
    value: '[shenshou]',
    name: 'shenshou'
  },
  {
    src: srcBase + 'd_shiwang.png',
    value: '[shiwang]',
    name: 'shiwang'
  },
  {
    src: srcBase + 'd_shuai.png',
    value: '[shuai]',
    name: 'shuai'
  },
  {
    src: srcBase + 'd_shuijiao.png',
    value: '[shuijiao]',
    name: 'shuijiao'
  },
  {
    src: srcBase + 'd_sikao.png',
    value: '[sikao]',
    name: 'sikao'
  },
  {
    src: srcBase + 'd_taikaixin.png',
    value: '[taikaixin]',
    name: 'taikaixin'
  },
  {
    src: srcBase + 'd_touxiao.png',
    value: '[touxiao]',
    name: 'touxiao'
  },
  {
    src: srcBase + 'd_tu.png',
    value: '[tu]',
    name: 'tu'
  },
  {
    src: srcBase + 'd_tuzi.png',
    value: '[tuzi]',
    name: 'tuzi'
  },
  {
    src: srcBase + 'd_wabishi.png',
    value: '[wabishi]',
    name: 'wabishi'
  },
  {
    src: srcBase + 'd_weiqu.png',
    value: '[weiqu]',
    name: 'weiqu'
  },
  {
    src: srcBase + 'd_xiaoku.png',
    value: '[xiaoku]',
    name: 'xiaoku'
  },
  {
    src: srcBase + 'd_xiongmao.png',
    value: '[xiongmao]',
    name: 'xiongmao'
  },
  {
    src: srcBase + 'd_xixi.png',
    value: '[xixi]',
    name: 'xixi'
  },
  {
    src: srcBase + 'd_xu.png',
    value: '[xu]',
    name: 'xu'
  },
  {
    src: srcBase + 'd_yinxian.png',
    value: '[yinxian]',
    name: 'yinxian'
  },
  {
    src: srcBase + 'd_yiwen.png',
    value: '[yiwen]',
    name: 'yiwen'
  },
  {
    src: srcBase + 'd_youhengheng.png',
    value: '[youhengheng]',
    name: 'youhengheng'
  },
  {
    src: srcBase + 'd_yun.png',
    value: '[yun]',
    name: 'yun'
  },
  {
    src: srcBase + 'd_zhuakuang.png',
    value: '[zhuakuang]',
    name: 'zhuakuang'
  },
  {
    src: srcBase + 'd_zhutou.png',
    value: '[zhutou]',
    name: 'zhutou'
  },
  {
    src: srcBase + 'd_zuiyou.png',
    value: '[zuiyou]',
    name: 'zuiyou'
  },
  {
    src: srcBase + 'd_zuohengheng.png',
    value: '[zuohengheng]',
    name: 'zuohengheng'
  },
  {
    src: srcBase + 'f_geili.png',
    value: '[geili]',
    name: 'geili'
  },
  {
    src: srcBase + 'f_hufen.png',
    value: '[hufen]',
    name: 'hufen'
  },
  {
    src: srcBase + 'f_jiong.png',
    value: '[jiong]',
    name: 'jiong'
  },
  {
    src: srcBase + 'f_meng.png',
    value: '[meng]',
    name: 'meng'
  },
  {
    src: srcBase + 'f_shenma.png',
    value: '[shenma]',
    name: 'shenma'
  },
  {
    src: srcBase + 'f_v5.png',
    value: '[v5]',
    name: 'v5'
  },
  {
    src: srcBase + 'f_xi.png',
    value: '[xi]',
    name: 'xi'
  },
  {
    src: srcBase + 'f_zhi.png',
    value: '[zhi]',
    name: 'zhi'
  },
  {
    src: srcBase + 'h_buyao.png',
    value: '[buyao]',
    name: 'buyao'
  },
  {
    src: srcBase + 'h_good.png',
    value: '[good]',
    name: 'good'
  },
  {
    src: srcBase + 'h_haha.png',
    value: '[haha]',
    name: 'haha'
  },
  {
    src: srcBase + 'h_lai.png',
    value: '[lai]',
    name: 'lai'
  },
  {
    src: srcBase + 'h_ok.png',
    value: '[ok]',
    name: 'ok'
  },
  {
    src: srcBase + 'h_quantou.png',
    value: '[quantou]',
    name: 'quantou'
  },
  {
    src: srcBase + 'h_ruo.png',
    value: '[ruo]',
    name: 'ruo'
  },
  {
    src: srcBase + 'h_woshou.png',
    value: '[woshou]',
    name: 'woshou'
  },
  {
    src: srcBase + 'h_ye.png',
    value: '[ye]',
    name: 'ye'
  },
  {
    src: srcBase + 'h_zan.png',
    value: '[zan]',
    name: 'zan'
  },
  {
    src: srcBase + 'h_zuoyi.png',
    value: '[zuoyi]',
    name: 'zuoyi'
  },
  {
    src: srcBase + 'l_shangxin.png',
    value: '[shangxin]',
    name: 'shangxin'
  },
  {
    src: srcBase + 'l_xin.png',
    value: '[xin]',
    name: 'xin'
  },
  {
    src: srcBase + 'o_dangao.png',
    value: '[dangao]',
    name: 'dangao'
  },
  {
    src: srcBase + 'o_feiji.png',
    value: '[feiji]',
    name: 'feiji'
  },
  {
    src: srcBase + 'o_ganbei.png',
    value: '[ganbei]',
    name: 'ganbei'
  },
  {
    src: srcBase + 'o_huatong.png',
    value: '[huatong]',
    name: 'huatong'
  },
  {
    src: srcBase + 'o_lazhu.png',
    value: '[lazhu]',
    name: 'lazhu'
  },
  {
    src: srcBase + 'o_liwu.png',
    value: '[liwu]',
    name: 'liwu'
  },
  {
    src: srcBase + 'o_lvsidai.png',
    value: '[lvsidai]',
    name: 'lvsidai'
  },
  {
    src: srcBase + 'o_weibo.png',
    value: '[weibo]',
    name: 'weibo'
  },
  {
    src: srcBase + 'o_weiguan.png',
    value: '[weiguan]',
    name: 'weiguan'
  },
  {
    src: srcBase + 'o_yinyue.png',
    value: '[yinyue]',
    name: 'yinyue'
  },
  {
    src: srcBase + 'o_zhaoxiangji.png',
    value: '[zhaoxiangji]',
    name: 'zhaoxiangji'
  },
  {
    src: srcBase + 'o_zhong.png',
    value: '[zhong]',
    name: 'zhong'
  },
  {
    src: srcBase + 'w_fuyun.png',
    value: '[fuyun]',
    name: 'fuyun'
  },
  {
    src: srcBase + 'w_shachenbao.png',
    value: '[shachenbao]',
    name: 'shachenbao'
  },
  {
    src: srcBase + 'w_taiyang.png',
    value: '[taiyang]',
    name: 'taiyang'
  },
  {
    src: srcBase + 'w_weifeng.png',
    value: '[weifeng]',
    name: 'weifeng'
  },
  {
    src: srcBase + 'w_xianhua.png',
    value: '[xianhua]',
    name: 'xianhua'
  },
  {
    src: srcBase + 'w_xiayu.png',
    value: '[xiayu]',
    name: 'xiayu'
  },
  {
    src: srcBase + 'w_yueliang.png',
    value: '[yueliang]',
    name: 'yueliang'
  },
]

export default {
  getAll () {
    let emotionMap = {}
    emotions.forEach((emotion) => {
      emotionMap[emotion.value] = emotion
    })
    return emotionMap
  }
}