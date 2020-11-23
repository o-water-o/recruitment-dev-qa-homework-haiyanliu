/// <reference types="cypress" />

import { resolve } from "cypress/types/bluebird";

describe('Open the job post on eleduck', () => {

  beforeEach(() => {
    // make sure the search bar shown
    cy.viewport(1400, 1000);
  })

  // Notice
  // You can use these keywords or other things you need
  // - 测试开发
  // - 为您找到以下内容
  // - 篱下采菊
  // - 自动化测试

  it('finds and opens the job post', async () => {
    cy.visit('https://eleduck.com/')

    // 具体测试思路您可以完全自由发挥，
    // 以下思路仅供参考。

    // 输入搜索内容并点击搜索
    // 1. 在页面上找到搜索框对应的css class name，通过它定位到“搜索框”对应的html元素
    // 2. 输入`测试开发`
    // 3. 找到搜索框中可点击的搜索图标
    // 4. 点击该图标，触发搜索

    cy.get('.ant-input') // TODO: css class of "search text field"
      .type('测试开发')
      .get('.ant-input-search-icon') // TODO: css class of "search icon"
      .click();

    // 等待搜索结果页面完全导入，以方便后续操作
    // 1. 检查页面中是否包含文字 `为您找到以下内容`
    // 2. 该操作可能需要等待，可设置超时时间，比如为5秒
    cy.wait(5000);
    cy.contains('为您找到以下内容');
   
    // TODO

    // 在搜索结果中寻找目标帖
    // 1. 通过定位 `篱下采菊` 元素来缩小范围
    // 2. 以其为基准，向上及下向寻找帖子标题对应的html元素
    // 3. 点击标题打开帖子
    let urls:string[] = []
    function geturls(){
      let urls:string[] = []
      return new Cypress.Promise(resolve=>{
        cy.xpath('//div[@class="post-item"]//span[@title="篱下采菊"][1]/ancestor::div[@class="body"]/h2/a')
        .each(
          ($el)=>{
            cy.wrap($el)
            .invoke('attr','href')
            .then(href=>{
              if (href)
                urls.push(href)})
          }
        )
        .then(()=>resolve(urls))
      })
    }

    cy.xpath('//div[@class="post-item"]//span[@title="篱下采菊"][1]/ancestor::div[@class="body"]/h2/a')
      .last()
      .click()

    // TODO

    // 确定页面中包含 `自动化测试`
    // 1. 由于是新打开页面，需要时间，注意设置超时时间，比如5秒
    cy.wait(5000)
    cy.contains('自动化测试')
    // TODO

  });

})
