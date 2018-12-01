import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { environment } from '../environments/environment';

@Component({
  selector   : 'app-root',
  templateUrl: './app.component.html',
  styleUrls  : [ './app.component.less' ]
})
export class AppComponent implements OnInit {
  isCollapsed = false;
  triggerTemplate = null;
  @ViewChild('trigger') customTrigger: TemplateRef<void>;

  colorList = [
    {
      key  : 'dust',
      color: '#F5222D'
    },
    {
      key  : 'volcano',
      color: '#FA541C'
    },
    {
      key  : 'sunset',
      color: '#FAAD14'
    },
    {
      key  : 'cyan',
      color: '#13C2C2'
    },
    {
      key  : 'green',
      color: '#52C41A'
    },
    {
      key  : 'daybreak',
      color: '#1890FF'
    },
    {
      key  : 'geekblue',
      color: '#2F54EB'
    },
    {
      key  : 'purple',
      color: '#722ED1'
    }
  ];

  // theme
  bgColor = '#1890FF';
  lessLoaded = false;

  initColor() {
    const node = document.createElement('link');
    node.rel = 'stylesheet/less';
    node.type = 'text/css';
    node.href = '/assets/color.less';
    document.getElementsByTagName('head')[ 0 ].appendChild(node);
  }

  // 切换主题
  changeTheme(primaryColor: string) {
    this.bgColor = primaryColor;

    if (!this.bgColor || environment.production) {
      return;
    }

    const loadingMessage = this.nzMessageService.loading('正在编译less...').messageId;

    const changeColor = () => {
      (window as any).less.modifyVars({
        '@primary-color': this.bgColor
      }).then(() => {
        this.nzMessageService.remove(loadingMessage);
        this.nzMessageService.success('成功加载新主题');
        window.scrollTo(0, 0);
      });
    };

    const lessUrl = 'https://cdnjs.cloudflare.com/ajax/libs/less.js/2.7.2/less.min.js';

    if (this.lessLoaded) {
      changeColor();
    } else {
      (window as any).less = {
        async: true
      };
      this.loadScript(lessUrl).then(() => {
        this.lessLoaded = true;
        changeColor();
      });
    }
  }

  loadScript(src: string) {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = src;
      script.onload = resolve;
      script.onerror = reject;
      document.head.appendChild(script);
    });
  }

  constructor(private nzMessageService: NzMessageService) {
  }

  ngOnInit() {
    this.initColor();
  }
}
