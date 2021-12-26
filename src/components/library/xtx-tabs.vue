<script>
export default {
  name: "XtxTabs",
  render() {
    // 返回的内容会进行渲染
    // 1. 在babel的帮助下 可以在vue中写jsx语法
    // 2. 数据的使用
    const name = "tom";
    // 3. 事件如何绑定
    const say = () => {
      console.log("h1 jsx");
    };
    // 4. 定义一个jsx对象
    const sub = <sub>123</sub>;
    return (
      <h1 title={name} onClick={say}>
        {name}
        {sub}
      </h1>
    );
  },
};
</script>
