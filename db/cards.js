var attack_cards = [
	{
		title:"Bola de eliminación",
		intro: "No hay defensa posible",
		defense_can_use: [],
		valid_for: "attack",
		pic: "",
		description: "Si el guerrero al que ataacas tiene menos de 25 de energía, queda eliminado.",
		damage: 25,
		combo: "YYPGR"
	},
	{
		title:"Kamehameha a bocajarro",
		intro: "Defensa: Solo cartas",
		defense_can_use: ["cards"],
		valid_for: "attack",
		pic: "",
		description: "Este ataque causa 42 daños a la energia del enemigo al que ataques.",
		damage: 42,
		combo: "YPPRR"
	},
	{
		title:"Contraataque",
		intro: "Se usa en respuesta a un ataque",
		defense_can_use: ["cards","dice"],
		valid_for: "counterattack",
		pic: "",
		description: "Esquivas el ataque y respondes con un puñetazo que causa 27 daños al atacante.",
		damage: 27,
		combo: "PYRB",
	},
	{
		title:"Salto temporal",
		intro: "Se usa en respuesta a un ataque",
		defense_can_use: ["cards","dice"],
		valid_for: "counterattack",
		pic: "",
		description: "Esquivas el ataque del enemigo y contraatacas haciéndole perder 32 daños.",
		damage: 32,
		combo: "PGRBB",
	}
];