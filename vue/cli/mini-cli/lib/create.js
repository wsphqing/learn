/**
 * create 命令处理函数
 */

const path = require('path')
const inquirer = require('inquirer')
const Creator = require('./Creator')
const Generator = require('./Generator')
const PromptModuleAPI = require('./PromptModuleAPI')

const clearConsloe = require('./utils/clearConsole')


async function create(name) {
  /*
  const prompts = [
    {
      "name": "features", // 选项名称
      "message": "Check the features needed for your project:", // 选项提示语
      "pageSize": 10,
      "type": "checkbox", // 选项类型 另外还有 confirm list 等
      "choices": [ // 具体的选项
        {
          "name": "Babel",
          "value": "babel",
          "short": "Babel",
          "description": "Transpile modern JavaScript to older versions (for compatibility)",
          "link": "https://babeljs.io/",
          "checked": true
        },
        {
          "name": "Router",
          "value": "router",
          "description": "Structure the app with dynamic pages",
          "link": "https://router.vuejs.org/"
        },
      ]
    },
    {
      name: 'historyMode',
      when: answers => answers.features.includes('router'),
      type: 'confirm',
      message: `Use history mode for router? ${chalk.yellow(`(Requires proper server setup for index fallback in production)`)}`,
      description: `By using the HTML5 History API, the URLs don't need the '#' character anymore.`,
      link: 'https://router.vuejs.org/guide/essentials/history-mode.html',
    }
  ]

  inquirer.prompt(prompts)
  */

  const creator = new Creator()
  const promptAPI = new PromptModuleAPI(creator)
  const promptModules = getPromptModules()
  promptModules.forEach(m => m(promptAPI))

  clearConsloe()

  // 弹出交互提示语并获取用户的选择
  const answers = await inquirer.prompt(creator.getFinalPrompts())
  // 填入vue webpack 必选项，无需用户选择
  answers.features.unshift('vue', 'webpack')

  const pkg = {
    name,
    version: '0.1.0',
    dependencies: {},
    deveDependancies: {}
  }

  const generator = new Generator(pkg, path.join(process.cwd(), name))

  // 根据用户选择的选项加载相应的模块，在 package.json 写入对应的依赖项
  // 并且将对应的 template 模块渲染
  answers.features.forEach(feature => {
    require(`./generator/${feature}`)(generator, answers)
  })

  await generator.generate()
  console.log('\n正在下载依赖...\n')

  console.log('\n依赖下载完成! 执行下列命令开始开发：\n')
  console.log(`cd ${name}`)
  console.log(`npm run dev`)
}
function getPromptModules() {
  return ['babel', 'router', 'vuex', 'linter'].map(file => require(`./promptModules/${file}`))
}

module.exports = create