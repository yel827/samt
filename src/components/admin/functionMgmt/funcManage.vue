<template>
  <div id="ed">
    <div class="home_header">功能管理</div>
    <el-row>
      <el-col>
        <div class="header_table" >
          <div style="background:#eef1f6; color:#001642;">项目名称</div>
          <div style="background:#eef1f6; color:#001642;">功能控制</div>
        </div>
        <div class="main_table" style="border-top:none;" v-for="(item,index) in list" :key="index">
          <div class="main_table_side">{{item.label}}</div>
          <div class="main_table_section">
            <div class="main_table_list" v-for="(items,index) in item.lists" :key="index">
              <el-image :src="items.img" class="img_main" alt />
              <span id="main_table_title">{{items.name}}</span>
              <el-switch v-model="value" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  data() {
    return {
      value: true,
      list: [
        {
          label: "电信5G项目",
          lists: [
            {
              img:
                "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
              name: "安全考试"
            },
            {
              img:
                "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
              name: "安全考试"
            },
            {
              img:
                "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
              name: "安全考试"
            },
            {
              img:
                "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
              name: "安全考试"
            },
            {
              img:
                "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
              name: "安全考试"
            },
            {
              img:
                "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
              name: "安全考试"
            }
          ]
        },
        {
          label: "电信5G项目",
          lists: [
            {
              img:
                "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
              name: "安全考试"
            },
            {
              img:
                "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
              name: "安全考试"
            },
            {
              img:
                "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
              name: "安全考试"
            },
            {
              img:
                "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
              name: "安全考试"
            },
            {
              img:
                "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
              name: "安全考试"
            },
            {
              img:
                "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
              name: "安全考试"
            }
          ]
        },
        {
          label: "电信5G项目",
          lists: [
            {
              img:
                "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
              name: "安全考试"
            },
            {
              img:
                "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
              name: "安全考试"
            },
            {
              img:
                "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
              name: "安全考试"
            },
            {
              img:
                "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
              name: "安全考试"
            },
            {
              img:
                "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
              name: "安全考试"
            },
            {
              img:
                "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
              name: "安全考试"
            }
          ]
        }
      ]
    };
  }
};
</script>
<style lang="less" scoped>
.home_header {
  width: 100%;
  height: 20px;
  line-height: 10px;
  border-bottom: 1px solid #ccc;
  margin-bottom: 22px;
  box-sizing: border-box;
}
.el-row {
  width: 100%;
  height: 84vh;
  box-sizing: border-box;
  .el-col {
    width: 100%;
    height: 100%;
    background: #fff;
    padding: 20px;
    box-sizing: border-box;
    .header_table {
      width: 100%;
      height: 40px;
      border: 1px solid #eef1f6;
      box-sizing: border-box;
      display: flex;
      :nth-child(1) {
        width: 20%;
        border-right: 1px solid #eef1f6;
        display: flex;
        justify-content: center;
        align-items: center;
        box-sizing: border-box;
      }
      :nth-child(2) {
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
    .main_table {
      width: 100%;
      height: 200px;
      border-top: 1px solid #ccc;
      border-left: 1px solid #ccc;
      border-bottom: 1px solid #ccc;
      box-sizing: border-box;
      display: flex;
      .main_table_side {
        width: 20%;
        border-right: 1px solid #ccc;
        display: flex;
        justify-content: center;
        align-items: center;
        box-sizing: border-box;
      }
      .main_table_section {
        flex: 1;
        display: flex;
        flex-direction: row;
        .main_table_list {
          flex: 1;
          border-right: 1px solid #ccc;
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          box-sizing: border-box;
        }
      }
    }
  }
}
/deep/.el-image {
  width: 90px;
  height: 90px;
  margin-top: 16px;
}
#main_table_title {
  line-height: 34px;
}
.but {
  width: 50px;
  height: 20px !important;
  border: 1px solid #ccc;
  box-sizing: border-box;
}
</style>
