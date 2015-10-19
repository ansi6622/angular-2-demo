import {provide, bootstrap, Component, FORM_DIRECTIVES, CORE_DIRECTIVES, ViewEncapsulation} from 'angular2/angular2';
import {HTTP_PROVIDERS, Http, BaseRequestOptions, RequestOptions, Headers} from 'angular2/http';

class Hero {
  id: number;
  name: string;

  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }
}

@Component({
  selector: 'demo-component',
  viewProviders: [HTTP_PROVIDERS],
  templateUrl: "/partials/heroes.html",
  directives: [FORM_DIRECTIVES, CORE_DIRECTIVES],
  styles:[`
    @import url(/bootstrap/dist/css/bootstrap.min.css);
  `],
  encapsulation: ViewEncapsulation.Native,
})
class AppComponent {
  public title = 'Tour of Heroes';
  public selectedHero: Hero;
  public heroes: Hero[] = [];
  public http: Http;

  constructor(http: Http) {
    this.http = http
    http.get('/api/heroes')
      .map(res => res.json())
      .subscribe(people => this.heroes = people);
  }

  onSelect(hero: Hero) { this.selectedHero = hero; }

  getSelectedClass(hero: Hero) {
    return { 'selected': hero === this.selectedHero };
  }

  addHero(hero: string) {
    var headers: Headers = new Headers();
    headers.set('Content-Type', 'application/json')

    this.http.post(
      '/api/heroes',
      JSON.stringify({name: hero}),
      new RequestOptions({ headers: headers })
    ).map(res => res.json())
      .subscribe(hero => this.heroes.push(hero));
  }

  doneTyping($event) {
    if($event.which === 13) {
      this.addHero($event.target.value);
      $event.target.value = null;
    }
  }
}

bootstrap(AppComponent);
