import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { AccessibilityService } from '../../services/accessibility.service';

interface Recipe {
  alternative: string;
  name: string;
  category: string;
  time: string;
  ingredients: string[];
  instructions: string[];
}

@Component({
  selector: 'app-alternative-recipes',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './alternative-recipes.component.html',
  styleUrls: ['./alternative-recipes.component.css']
})
export class AlternativeRecipesComponent implements OnInit {
  selectedCategory = 'Todos';
  selectedRecipe: Recipe | null = null;
  categories = ['Todos', 'Bolos & Doces', 'Pães & Massas', 'Bebidas & Cremes', 'Saladas & Pratos'];

  recipes: Recipe[] = [
    {
      alternative: 'Mel de Abelha',
      name: 'Bolo de Banana Adoçado com Mel',
      category: 'Bolos & Doces',
      time: '40 minutos',
      ingredients: [
        '3 bananas maduras amassadas',
        '3 ovos inteiros',
        '1/2 xícara de mel de abelha',
        '2 xícaras de farinha de aveia',
        '1/2 xícara de azeite de oliva ou óleo de coco',
        '1 colher de sopa de fermento químico em pó'
      ],
      instructions: [
        'Bata no liquidificador os ovos, o mel, o óleo e as bananas maduras.',
        'Despeje a mistura em uma tigela e acrescente a farinha de aveia aos poucos, mexendo bem.',
        'Adicione o fermento e misture delicadamente.',
        'Asse em forno preaquecido a 180°C por cerca de 30 a 35 minutos.'
      ]
    },
    {
      alternative: 'Purê de Maçã',
      name: 'Muffins Integrais de Maçã',
      category: 'Bolos & Doces',
      time: '30 minutos',
      ingredients: [
        '1 xícara de purê de maçã (maçã cozida e amassada)',
        '2 ovos',
        '1 xícara de farinha de trigo integral',
        '1/2 xícara de aveia em flocos',
        '1 colher de chá de canela em pó',
        '1 colher de sopa de fermento químico'
      ],
      instructions: [
        'Misture o purê de maçã e os ovos em uma tigela grande.',
        'Adicione a farinha integral, a aveia e a canela, misturando até ficar homogêneo.',
        'Incorpore o fermento em pó suavemente.',
        'Distribua em forminhas de muffin e asse a 180°C por 20 minutos.'
      ]
    },
    {
      alternative: 'Adoçante Estévia',
      name: 'Chá Gelado com Limão e Estévia',
      category: 'Bebidas & Cremes',
      time: '10 minutos',
      ingredients: [
        '1 litro de água filtrada',
        '2 sachês de chá preto ou chá verde',
        'Suco de 1 limão espremido',
        '1/2 colher de chá de adoçante estévia líquido',
        'Folhas de hortelã fresca e pedras de gelo'
      ],
      instructions: [
        'Aqueça a água até quase ferver e faça a infusão dos sachês de chá por 5 minutos.',
        'Retire os sachês e deixe o chá esfriar.',
        'Adicione o suco de limão e adoce com o adoçante estévia.',
        'Sirva bem gelado com folhas de hortelã e pedras de gelo.'
      ]
    },
    {
      alternative: 'Farinha de Aveia',
      name: 'Panquecas Fit de Aveia',
      category: 'Pães & Massas',
      time: '15 minutos',
      ingredients: [
        '1 banana madura média',
        '1 ovo inteiro',
        '4 colheres de sopa de farinha de aveia',
        '1 colher de chá de canela em pó'
      ],
      instructions: [
        'Em um prato, amasse bem a banana com um garfo.',
        'Adicione o ovo e bata tudo vigorosamente.',
        'Misture a farinha de aveia e a canela até formar uma massa cremosa.',
        'Despeje porções em uma frigideira antiaderente aquecida, vire quando dourar e sirva.'
      ]
    },
    {
      alternative: 'Farinha de Amêndoas',
      name: 'Cookies Low-Carb de Amêndoas',
      category: 'Bolos & Doces',
      time: '25 minutos',
      ingredients: [
        '2 xícaras de farinha de amêndoas',
        '1 ovo',
        '3 colheres de sopa de óleo de coco derretido',
        '3 colheres de sopa de mel ou adoçante xilitol',
        '1/2 xícara de gotas de chocolate amargo'
      ],
      instructions: [
        'Em uma tigela, misture a farinha de amêndoas, o ovo, o óleo de coco e o mel.',
        'Adicione as gotas de chocolate e amasse com as mãos até formar uma massa modelável.',
        'Faça bolinhas, aperte-as em formato de cookies e coloque em uma assadeira com papel manteiga.',
        'Asse a 180°C por 12 a 15 minutos até as bordas dourarem.'
      ]
    },
    {
      alternative: 'Farinha de Arroz Integral',
      name: 'Pão Caseiro Sem Glúten',
      category: 'Pães & Massas',
      time: '50 minutos',
      ingredients: [
        '2 xícaras de farinha de arroz integral',
        '1/2 xícara de polvilho doce',
        '3 ovos',
        '1/2 xícara de água morna',
        '3 colheres de sopa de azeite',
        '1 colher de sopa de fermento biológico seco'
      ],
      instructions: [
        'Bata todos os ingredientes líquidos no liquidificador.',
        'Em uma tigela, junte a farinha de arroz, o polvilho doce e o fermento seco.',
        'Misture os secos com os líquidos até formar uma massa espessa.',
        'Despeje em uma forma de pão untada e deixe crescer por 20 minutos.',
        'Asse a 180°C por cerca de 30 minutos.'
      ]
    },
    {
      alternative: 'Azeite de Oliva',
      name: 'Pão Italiano Rústico com Ervas',
      category: 'Pães & Massas',
      time: '1 hora e 30 minutos',
      ingredients: [
        '3 xícaras de farinha de trigo integral',
        '1/4 xícara de azeite de oliva extravirgem',
        '1 colher de sopa de açúcar mascavo',
        '1 sachê de fermento biológico seco',
        '1 xícara de água morna',
        'Alecrim seco e sal a gosto'
      ],
      instructions: [
        'Misture a água morna, o açúcar e o fermento. Deixe descansar por 5 minutos.',
        'Adicione o azeite de oliva e, aos poucos, a farinha de trigo e o sal.',
        'Sove a massa por 10 minutos, cubra e deixe crescer por 45 minutos.',
        'Modelar o pão, salpicar alecrim por cima e assar a 200°C por 30 minutos.'
      ]
    },
    {
      alternative: 'Purê de Abacate',
      name: 'Mousse de Chocolate e Abacate',
      category: 'Bolos & Doces',
      time: '10 minutos',
      ingredients: [
        '1 abacate maduro médio',
        '1/2 xícara de cacau em pó 100%',
        '1/3 xícara de mel ou calda de agave',
        '1/4 xícara de leite de amêndoas',
        '1 colher de chá de extrato de baunilha'
      ],
      instructions: [
        'Corte o abacate ao meio, retire o caroço e remova a polpa com uma colher.',
        'Coloque todos os ingredientes no liquidificador ou processador.',
        'Bata muito bem até obter um creme sedoso, liso e homogêneo.',
        'Transfira para taças e leve à geladeira por no mínimo 1 hora antes de servir.'
      ]
    },
    {
      alternative: 'Iogurte Grego Natural',
      name: 'Bolo de Limão Super Úmido',
      category: 'Bolos & Doces',
      time: '45 minutos',
      ingredients: [
        '1 xícara de iogurte grego natural integral',
        '3 ovos',
        '1/2 xícara de mel',
        '2 xícaras de farinha de aveia',
        'Raspas e suco de 2 limões',
        '1 colher de sopa de fermento químico'
      ],
      instructions: [
        'Bata os ovos, o iogurte grego, o mel e o suco de limão.',
        'Incorpore a farinha de aveia e misture bem com um batedor manual.',
        'Adicione as raspas de limão e o fermento em pó.',
        'Coloque em uma forma untada e asse a 180°C por 30 a 35 minutos.'
      ]
    },
    {
      alternative: 'Leite de Amêndoas',
      name: 'Vitamina de Banana e Morango',
      category: 'Bebidas & Cremes',
      time: '5 minutos',
      ingredients: [
        '1 xícara de leite de amêndoas gelado',
        '1 banana congelada fatiada',
        '5 morangos frescos',
        '1 colher de sopa de sementes de linhaça'
      ],
      instructions: [
        'Coloque todos os ingredientes no liquidificador.',
        'Bata em velocidade alta por 2 minutos até obter um shake cremoso.',
        'Sirva imediatamente em um copo alto.'
      ]
    },
    {
      alternative: 'Leite de Aveia',
      name: 'Creme de Milho Sem Lactose',
      category: 'Bebidas & Cremes',
      time: '20 minutos',
      ingredients: [
        '1 lata de milho verde escorrido',
        '2 xícaras de leite de aveia',
        '1 colher de sopa de amido de milho',
        '1 colher de sopa de azeite de oliva',
        '1/2 cebola picada',
        'Sal, pimenta e noz-moscada a gosto'
      ],
      instructions: [
        'Bata o milho verde (reserve um pouco) e o leite de aveia no liquidificador.',
        'Em uma panela, doure a cebola no azeite.',
        'Adicione o creme de milho batido, o amido dissolvido e o milho reservado.',
        'Mexa até engrossar. Tempere com sal, pimenta e noz-moscada.'
      ]
    },
    {
      alternative: 'Leite de Coco',
      name: 'Moqueca Vegana de Cogumelos',
      category: 'Saladas & Pratos',
      time: '35 minutos',
      ingredients: [
        '300g de cogumelos shimeji ou paris limpos',
        '1 garrafa (200ml) de leite de coco',
        '1 pimentão vermelho e 1 pimentão amarelo em rodelas',
        '1 cebola grande em rodelas',
        '2 tomates maduros fatiados',
        'Coentro, cebolinha, azeite e sal a gosto'
      ],
      instructions: [
        'Em uma panela funda, faça camadas com cebola, pimentões e tomates.',
        'Adicione os cogumelos por cima.',
        'Regue com o leite de coco e o azeite. Tempere com sal.',
        'Tampe e cozinhe em fogo médio por 15 minutos. Finalize com coentro e cebolinha.'
      ]
    },
    {
      alternative: 'Sal de Ervas',
      name: 'Tempero Multiúso Saudável',
      category: 'Saladas & Pratos',
      time: '10 minutos',
      ingredients: [
        '1/2 xícara de sal grosso',
        '1/2 xícara de ervas desidratadas mistas (orégano, alecrim, manjericão, salsa)',
        '1 colher de chá de alho em pó'
      ],
      instructions: [
        'Coloque todos os ingredientes no liquidificador ou processador potente.',
        'Bata tudo até as ervas e o sal grosso ficarem finos e bem misturados.',
        'Armazene em um pote de vidro bem fechado e utilize nos seus pratos cotidianos.'
      ]
    },
    {
      alternative: 'Ervas Aromáticas',
      name: 'Molho Pesto de Manjericão',
      category: 'Saladas & Pratos',
      time: '10 minutos',
      ingredients: [
        '2 xícaras de folhas frescas de manjericão',
        '1/2 xícara de azeite de oliva extravirgem',
        '1/3 xícara de castanhas ou nozes',
        '2 dentes de alho picados',
        'Pimenta-do-reino moída na hora e uma pitada de sal'
      ],
      instructions: [
        'Em um processador ou pilão, amasse o alho e as castanhas.',
        'Adicione as folhas de manjericão e pulse até triturar bem.',
        'Adicione o azeite de oliva aos poucos enquanto processa.',
        'Tempere com pimenta e sal. Sirva com massas.'
      ]
    },
    {
      alternative: 'Limão Espremido',
      name: 'Salada de Folhas ao Molho Cítrico',
      category: 'Saladas & Pratos',
      time: '10 minutos',
      ingredients: [
        '1 maço de folhas verdes variadas (alface, rúcula, agrião)',
        'Suco de 1 limão',
        '3 colheres de sopa de azeite de oliva extravirgem',
        '1 colher de chá de mostarda dijon',
        '1 colher de chá de mel de abelha'
      ],
      instructions: [
        'Lave bem as folhas verdes e arrume-as em uma saladeira.',
        'Em um pote pequeno, misture o suco de limão, o azeite, a mostarda e o mel.',
        'Regue a salada com o molho emulsionado antes de servir.'
      ]
    }
  ];

  constructor(
    private authService: AuthService,
    private router: Router,
    private accessibilityService: AccessibilityService
  ) {}

  ngOnInit() {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
    } else {
      if (this.recipes.length > 0) {
        this.selectedRecipe = this.recipes[0];
      }
    }
  }

  get filteredRecipes(): Recipe[] {
    return this.recipes.filter(rec => {
      return this.selectedCategory === 'Todos' || rec.category === this.selectedCategory;
    });
  }

  selectRecipe(recipe: Recipe) {
    this.selectedRecipe = recipe;
    this.accessibilityService.stopSpeaking();
  }

  speakRecipe() {
    if (!this.selectedRecipe) return;

    let text = `Receita de ${this.selectedRecipe.name}, utilizando o substituto ${this.selectedRecipe.alternative}. Tempo de preparo total: ${this.selectedRecipe.time}. Ingredientes necessários: `;
    this.selectedRecipe.ingredients.forEach(ing => {
      text += `${ing}. `;
    });
    text += `Passo a passo para o preparo: `;
    this.selectedRecipe.instructions.forEach((inst, index) => {
      text += `Passo ${index + 1}: ${inst}. `;
    });

    this.accessibilityService.speak(text);
  }

  stopVoice() {
    this.accessibilityService.stopSpeaking();
  }
}
