  userData: User ={
    id:'',
    name: '',
    surname: '',
    email: '',
    dni: '',
    phoneNumber: '',
    birthDate: new Date("2019-01-16"),
    cp: '',
    city: '',
    roleAdmin: false,
    token: '',
    urlImage:''
  };//Necesario para evitar error de lectura de un valor NULO
  userSubscription : Subscription | undefined;

  constructor(private userService : UserService, private route: ActivatedRoute){}


  //Cuando creamos el componente hacemos una peticion para obtener el usuario
  ngOnInit(): void {
    const userId = this.getCurrentId();
    this.userSubscription = this.userService.obtenerUsuarioPorId(userId).subscribe(
       (response) => {
        this.userData = response;
      },
    );
  }


  //Cuando el compo se destruya, nos desubscribimos
  ngOnDestroy(): void {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }

  //Método que devuelve el id de la ruta
  getCurrentId():any  {
    const currentRoute =  this.route.snapshot;
    const params = currentRoute.paramMap;
    const id = params.get('id');
    return id;
  }





}
