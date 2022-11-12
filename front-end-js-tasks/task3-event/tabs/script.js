"use strict";

const tabs = document.querySelector("tab-panel");
const tabList = [];

const displayTabContent = (activeTab) => {
  const previousActiveTab = tabList.find((tabElement) =>
    tabElement.button.classList.contains("activeTab")
  );
  if (previousActiveTab) {
    previousActiveTab.button.classList.remove("activeTab");
    previousActiveTab.content.style.display = "none";
    previousActiveTab.content.classList.remove("activeTab");
  }
  activeTab.content.style.display = "block";
  activeTab.content.classList.add("activeTab");
};

const changeTab = (tabList) => {
  for (let i = 0; i < tabList.length; i++) {
    const currentButton = tabList[i].button;
    currentButton.addEventListener("click", () => {
      displayTabContent(tabList[i]);
      currentButton.classList.add("activeTab");
    });
  }
};

function asTabs(node) {
  const tabContainer = document.createElement("div");
  tabContainer.className = "tabContainer";
  tabs.before(tabContainer);
  Object.values(node.children).forEach((child,index) => {
    const button = document.createElement("button");
    button.textContent = child.getAttribute("data-tabname");
    button.id = button.textContent;
    tabContainer.appendChild(button);
    tabList.push({ button, content: child });
    if(index !== 0) {
      child.style.display = "none";
    } else {
      button.classList.add("activeTab")
      child.classList.add("activeTab")
    }
  });
  changeTab(tabList);
}

asTabs(tabs);
