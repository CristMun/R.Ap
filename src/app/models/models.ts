export interface Usuario {
    uid:       string;
    name:      string;
    lastname:  string;
    rut:       string;
    gender:    'masculino' | 'femenino' | 'nobi',
    age:       number;
    email:     string;
    password:  string;
    direction: string;
    phone:     string;
    image:     string;
    rol:      'alumno' | 'profesor' | 'admin',
}